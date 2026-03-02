from flask import Flask, request, render_template, jsonify


app = Flask(__name__)



@app.route('/')
def index():
    return render_template('index.html')

@app.route('/science')
def science():
    return render_template('science.html')


@app.route('/software')
def software():
    return render_template('software.html')

@app.route('/news')
def news():
    return render_template('news.html')

@app.route('/projects')
def projects():
    return render_template('projects.html')


if __name__ == '__main__':
    app.run(debug=True)