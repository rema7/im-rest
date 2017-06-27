import datetime

def valid_to(delta_seconds):
    return datetime.datetime.utcnow() + datetime.timedelta(seconds=delta_seconds)

def is_valid(date):
    return datetime.datetime.utcnow() < date
