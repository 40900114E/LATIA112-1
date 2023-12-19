from flask import Flask, request, render_template
import requests

app = Flask(__name__)

@app.route('/') 
def formPage():
    return render_template('form.html')

@app.route("/submit", methods=['POST'])
def submit():
    print("submit")
    if request.method == 'POST':
        form_data = request.form
        print(form_data)
        new_data = {
            "Chinese": form_data['score1'],
            "English":form_data['score2'],
            "Math": form_data['score3'],
            "Science":form_data['score4'],
            "Society":form_data['score5'],
        }
        params = {}
        url = "http://localhost:3000/records"
        result = requests.post(url, params=params, json=new_data)
        print(result.status_code)
        print(result.content)
        return render_template('form.html', confirm = "上傳成功")
 
if __name__ == "__main__":
    app.run()