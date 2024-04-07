from flask import Flask, request, render_template, send_from_directory
import csv
import os
from werkzeug.utils import secure_filename

app = Flask(__name__, static_url_path='/static')

@app.route('/', methods=['get', 'post'])
def home():
    if request.method == 'POST':
        f = request.files['file']
        filename = secure_filename(f.filename)  
        f.save(os.path.join('static', filename))
        return 'File uploaded successfully!'
    return render_template('index.html')

@app.route('/static/<path:path>')
def send_static(path):
    return send_from_directory('static', path)

if __name__ == '__main__':
    app.run(host="localhost",port=int(5000))