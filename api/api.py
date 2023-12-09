import time
import numpy as np
import matplotlib.pyplot as plt
from flask import Flask, send_file, request, make_response
from PIL import Image
import io
import os


app = Flask(__name__)

if __name__ == "__main__":
    app.run(port=8000, debug=True)

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/recolorize', methods=['POST'])
def get_recolorize():
    # note: images are stored in bgr
    conversion = {
        'R': 2,
        'G': 1,
        'B': 0,
        'IR': 3,
        'UV': 4,
    }

    fileName = request.args.get('fileName')
    mapping = request.args.get('mapping').split(",")
    mapping = [conversion[m] for m in mapping]

    sample_im = np.load(f"./gallery/{fileName}")

    # Select correct channels
    recolorized_im = sample_im[:, :, mapping]
    plt.imsave('./gallery/display.jpg', recolorized_im)

    # Create or process your image here
    # For demonstration, let's create a simple image using Pillow
    img_io = io.BytesIO()
    Image.fromarray(recolorized_im).save(img_io, 'JPEG')
    img_io.seek(0)

    # Write back to frontend
    return send_file(img_io, mimetype='image/jpeg')


@app.route('/get_all_gallery_filenames', methods=['GET'])
def get_all_image_names():
    ret = os.listdir("./gallery/")
    if os.path.exists('./gallery/.DS_Store'):
        ret.remove(".DS_Store")
    # TODO: cleanup
    # This is so jank
    ret.remove("display.jpg")
    response = make_response(ret)
    response.headers['Cache-Control'] = 'public, max-age=86400'
    return response


@app.route('/get_gallery_image', methods=['GET'])
def get_image():
    fileName = request.args.get('fileName')

    print("Getting:", f"./gallery/{fileName}")
    sample_im = np.load(f"./gallery/{fileName}")

    # Select correct channels, note images are stored as BGR
    rgb_im = sample_im[:, :, [2, 1, 0]]

    # Create or process your image here
    # For demonstration, let's create a simple image using Pillow
    img_io = io.BytesIO()
    Image.fromarray(rgb_im).save(img_io, 'JPEG')
    img_io.seek(0)

    response = make_response(send_file(img_io, mimetype='image/jpeg'))
    response.headers['Cache-Control'] = 'public, max-age=86400'
    return response
