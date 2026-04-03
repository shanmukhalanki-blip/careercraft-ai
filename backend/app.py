from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    result = None

    if request.method == 'POST':
        resume = request.form.get('resume')
        job = request.form.get('job')

        # Safety handling
        resume = resume if resume else ""
        job = job if job else ""

        # Basic analysis
        word_count = len(resume.split())
        score = 60

        if word_count > 200:
            score += 20
        else:
            score -= 10

        if job:
            score += 10

        # Preview snippets
        resume_preview = resume[:200] if resume else "No resume provided"
        job_preview = job[:150] if job else "No job description provided"

        # FINAL OUTPUT WITH CLEAR CTA
        result = f"""
🚀 RESUME ANALYSIS REPORT

-----------------------------------

📊 BASIC METRICS

• Word Count: {word_count}  
• Resume Score: {score}/100  

-----------------------------------

📄 RESUME PREVIEW

"{resume_preview}..."

-----------------------------------

🎯 JOB CONTEXT

"{job_preview}..."

-----------------------------------

📈 KEY INSIGHTS

• Improve bullet points with action verbs  
• Add measurable achievements (numbers/results)  
• Align keywords with job description  
• Improve formatting for ATS systems  

-----------------------------------

🔒 FULL OPTIMIZATION INCLUDES:

✔ ATS-optimized resume rewrite  
✔ Tailored cover letter  
✔ LinkedIn profile summary  
✔ Job-specific keyword optimization  
✔ Detailed improvement suggestions  

-----------------------------------

👉 PLACE YOUR ORDER ON FIVERR TO GET FULL OPTIMIZED VERSION

🚀 Let’s help you get shortlisted faster!
"""

    return render_template('index.html', result=result)

if __name__ == '__main__':
    print("🚀 Starting Flask app...")
    app.run(debug=True)