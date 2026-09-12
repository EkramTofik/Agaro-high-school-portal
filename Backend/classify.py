from http.server import BaseHTTPRequestHandler
import json
import math
import re

TRAINING_EXAMPLES = [
    ("news", "what is the latest news"),
    ("news", "any recent announcements"),
    ("news", "what's new at the school"),
    ("news", "tell me the latest updates"),
    ("news", "is there any urgent news"),
    ("news", "what happened recently"),
    ("news", "recent school news"),

    ("events", "what events are coming up"),
    ("events", "when is the next event"),
    ("events", "upcoming events this month"),
    ("events", "is there anything happening soon"),
    ("events", "school calendar events"),
    ("events", "when is the sports day"),
    ("events", "any events scheduled"),
    ("events", "how many events are there"),

    ("staff", "who is the president"),
    ("staff", "who teaches math"),
    ("staff", "who is the principal"),
    ("staff", "tell me about the teachers"),
    ("staff", "who is on the leadership team"),
    ("staff", "faculty members list"),
    ("staff", "who is the vice president"),
    ("staff", "staff directory"),
    ("staff", "who is the school president"),
    ("staff", "school administration leadership"),
    ("staff", "how many staff members are there"),
    ("staff", "how many teachers does the school have"),

    ("departments", "what departments does the school have"),
    ("departments", "who heads the science department"),
    ("departments", "list of academic departments"),
    ("departments", "department information"),
    ("departments", "how many departments are there"),

    ("clubs", "what clubs are available"),
    ("clubs", "is there a debate club"),
    ("clubs", "student clubs list"),
    ("clubs", "who coordinates the science club"),
    ("clubs", "how many clubs are there"),
    ("clubs", "how many clubs does the school have"),
    ("clubs", "tell me about a specific club"),

    ("school_info", "when was the school founded"),
    ("school_info", "where is the school located"),
    ("school_info", "what is the school address"),
    ("school_info", "tell me about the school"),
    ("school_info", "what is the school's motto"),
    ("school_info", "school history"),
    ("school_info", "where is the school"),
    ("school_info", "school location"),
    ("school_info", "when was the school built"),
    ("school_info", "when was the school constructed"),
    ("school_info", "what year was the school established"),
    ("school_info", "school founding year"),

    ("contact", "how can I contact the school"),
    ("contact", "what is the phone number"),
    ("contact", "school email address"),
    ("contact", "how do I reach the office"),
    ("contact", "contact information"),

    ("greeting", "hello"),
    ("greeting", "hi there"),
    ("greeting", "good morning"),
    ("greeting", "hey"),

    ("thanks", "thank you"),
    ("thanks", "thanks a lot"),
    ("thanks", "appreciate it"),

    ("honor_roll", "who is the top student"),
    ("honor_roll", "top students this year"),
    ("honor_roll", "honor roll list"),
    ("honor_roll", "who made honor roll"),
    ("honor_roll", "best performing students"),
    ("honor_roll", "student rankings"),
    ("honor_roll", "who is the second top student"),
    ("honor_roll", "top 3 students"),
    ("honor_roll", "who ranks first"),

    ("academic_performance", "how did students perform this year"),
    ("academic_performance", "what is the pass rate"),
    ("academic_performance", "average GPA this year"),
    ("academic_performance", "academic results summary"),
    ("academic_performance", "how many students passed"),
    ("academic_performance", "school performance statistics"),

    ("alumni", "tell me about notable alumni"),
    ("alumni", "who are famous graduates"),
    ("alumni", "alumni success stories"),
    ("alumni", "where are alumni now"),
    ("alumni", "featured alumni"),
    ("alumni", "how many alumni are there"),

    ("teams", "what sports teams do you have"),
    ("teams", "tell me about the football team"),
    ("teams", "sports team achievements"),
    ("teams", "how did the volleyball team do"),
    ("teams", "athletics results"),
    ("teams", "how many teams does the school have"),

    ("student_voice", "what do students say about the school"),
    ("student_voice", "student testimonials"),
    ("student_voice", "student stories"),
    ("student_voice", "hear from students"),
    ("student_voice", "who is the student president"),
    ("student_voice", "who is the student body president"),
    ("student_voice", "who is the student vice president"),
    ("student_voice", "student government leaders"),
    ("student_voice", "who leads the student council"),
    ("student_voice", "student council president"),
    ("student_voice", "student voice"),

    ("teams", "tell me about the champions"),
    ("teams", "which team are champions"),
    ("teams", "championship winning team"),

    ("departments", "who is the head of the department"),
    ("departments", "department head"),

    ("resources", "what resources are available"),
    ("resources", "study materials"),
    ("resources", "downloadable resources"),
    ("resources", "learning resources"),
    ("resources", "how many resources are there"),
    ("resources", "resource hub"),
    ("resources", "where can I find study guides"),
]

STOPWORDS = {
    "a", "an", "the", "is", "are", "was", "were", "be", "been", "am",
    "i", "you", "he", "she", "it", "we", "they", "me", "my", "your",
    "do", "does", "did", "can", "could", "will", "would", "should",
    "what", "who", "when", "where", "how", "why", "which",
    "of", "in", "on", "at", "to", "for", "with", "about", "any",
    "this", "that", "there", "please", "tell",
}

CONFIDENCE_THRESHOLD = 0.15


def stem(word):
    # A small, deliberately conservative suffix stripper — not a real
    # linguistic stemmer, just enough to collapse the common English
    # forms that showed up as mismatches: teacher/teachers, head/heads,
    # student/students, champion/champions, teach/teaches.
    if len(word) <= 3:
        return word
    if word.endswith("ies") and len(word) > 4:
        return word[:-3] + "y"
    if word.endswith("es") and len(word) > 4:
        return word[:-2]
    if word.endswith("ing") and len(word) > 5:
        return word[:-3]
    if word.endswith("ed") and len(word) > 4:
        return word[:-2]
    if word.endswith("s") and not word.endswith("ss") and len(word) > 3:
        return word[:-1]
    return word


def tokenize(text):
    text = text.lower()
    text = re.sub(r"[^a-z0-9\s]", " ", text)
    words = [w for w in text.split() if len(w) > 1 and w not in STOPWORDS]
    return [stem(w) for w in words]


# --- Build vocabulary + IDF weights once at module load ---
_document_tokens = [tokenize(text) for _, text in TRAINING_EXAMPLES]
_vocabulary = sorted({word for tokens in _document_tokens for word in tokens})

_idf = {}
for word in _vocabulary:
    docs_containing = sum(1 for tokens in _document_tokens if word in tokens)
    _idf[word] = math.log(len(TRAINING_EXAMPLES) / (1 + docs_containing)) + 1


def tf_vector(tokens):
    counts = {}
    for t in tokens:
        counts[t] = counts.get(t, 0) + 1
    length = len(tokens) or 1
    return [counts.get(word, 0) / length for word in _vocabulary]


def tfidf_vector(tokens):
    tf = tf_vector(tokens)
    return [val * _idf[word] for val, word in zip(tf, _vocabulary)]


def cosine_similarity(a, b):
    dot = sum(x * y for x, y in zip(a, b))
    mag_a = math.sqrt(sum(x * x for x in a))
    mag_b = math.sqrt(sum(y * y for y in b))
    if mag_a == 0 or mag_b == 0:
        return 0
    return dot / (mag_a * mag_b)


_training_vectors = [tfidf_vector(tokens) for tokens in _document_tokens]


def classify(question):
    tokens = tokenize(question)
    if not tokens:
        return "unknown", 0

    query_vector = tfidf_vector(tokens)

    best_score = 0
    best_intent = "unknown"
    for (intent, _), vec in zip(TRAINING_EXAMPLES, _training_vectors):
        score = cosine_similarity(query_vector, vec)
        if score > best_score:
            best_score = score
            best_intent = intent

    if best_score < CONFIDENCE_THRESHOLD:
        return "unknown", best_score

    return best_intent, best_score


class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            content_length = int(self.headers.get("Content-Length", 0))
            raw_body = self.rfile.read(content_length) if content_length else b"{}"
            data = json.loads(raw_body or b"{}")
            question = data.get("question", "")

            intent, confidence = classify(question)

            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({
                "intent": intent,
                "confidence": confidence,
            }).encode())
        except Exception as e:
            self.send_response(500)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode())