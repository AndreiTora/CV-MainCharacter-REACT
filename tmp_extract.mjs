import fs from 'fs'; import pdf from 'pdf-parse'; const data = fs.readFileSync('src\\Profile.pdf'); const res = await pdf(data); console.log(res.text);
