import time
from flask import Flask
from flask import request
import numpy as np
import matplotlib.pyplot as plt
from flask import Flask, send_file, request
from PIL import Image
import io


app = Flask(__name__)

if __name__ == "__main__":
    app.run(port=8000, debug=True)

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/recolorize', methods=['POST'])
def get_recolorize():
    conversion = {
        'R': 0,
        'G': 1,
        'B': 2,
        'IR': 3,
        'UV': 4,
    }

    imageSrc = request.args.get('imageSrc')
    mapping = request.args.get('mapping').split(",")
    mapping = [conversion[m] for m in mapping]

    sample_im = np.load("./images/2021-11-15_22-52-03_combined.npy")

    # Select correct channels
    recolorized_im = sample_im[:, :, mapping]
    plt.imsave('./images/display.jpg', recolorized_im)

    # Create or process your image here
    # For demonstration, let's create a simple image using Pillow
    img_io = io.BytesIO()
    Image.fromarray(recolorized_im).save(img_io, 'JPEG')
    img_io.seek(0)

    # Write back to frontend
    return send_file(img_io, mimetype='image/jpeg')