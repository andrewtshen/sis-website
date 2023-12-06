import time
from flask import Flask

app = Flask(__name__)

if __name__ == "__main__":
    app.run(port=8000, debug=True)

@app.route('/time')
def get_current_time():
    return {'time': time.time()}
