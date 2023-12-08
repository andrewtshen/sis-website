import time
from flask import Flask
from flask import request
import numpy as np

app = Flask(__name__)

if __name__ == "__main__":
    app.run(port=8000, debug=True)

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/recolorize')
def get_recolorize():
    imageSrc = request.args.get('imageSrc')

    sample_im = np.load("./images/2021-11-15_22-52-03_combined.npy")

    # Select correct channels
    
    # Write to display.jpg
    return {'response': imageSrc, 'shape': sample_im.shape}