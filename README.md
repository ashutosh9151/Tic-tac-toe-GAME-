# 🎮 Tic Tac Toe

A modern, attractive, and fully interactive **Tic Tac Toe** game built with pure **HTML**, **CSS**, and **JavaScript**.  
Play with a friend on the same device — no frameworks or build tools required.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## ✨ Features

- 🧑‍🤝‍🧑 **Two-player local multiplayer**
- ✅ **Real-time win & draw detection**
- 🏆 **Winning cells highlight** with animation
- 📊 **Score tracking** (saved with `localStorage`)
- 🔄 **New Game** and **Reset Scores** buttons
- 🎉 **Modal popup** on win or draw
- 🎨 Clean dark theme + smooth animations
- 📱 Fully responsive (mobile-friendly)
- ⌨️ Keyboard support (press `Esc` to close modal)

---

## 🛠️ Tech Stack

| Technology   | Purpose                         |
|--------------|---------------------------------|
| HTML5        | Structure & accessibility       |
| CSS3         | Styling, gradients & animations |
| JavaScript   | Game logic & DOM manipulation   |

---

## 🚀 Live Demo

After deploying with **GitHub Pages**, your game will be available at:

```
https://<your-username>.github.io/<repo-name>/
```

---

## 📦 How to Use / Deploy on GitHub

### Option 1 – Upload via GitHub website
1. Create a new repository on GitHub (e.g. `tic-tac-toe`)
2. Click **Add file → Upload files**
3. Upload these files:
   - `index.html`
   - `style.css`
   - `script.js`
   - `README.md`
4. Commit the changes

### Option 2 – Using Git
```bash
git init
git add .
git commit -m "Initial commit: Tic Tac Toe game"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/tic-tac-toe.git
git push -u origin main
```

### Enable GitHub Pages (to make it live)
1. Go to your repository → **Settings** → **Pages**
2. Under **Source**, select **Deploy from a branch**
3. Choose branch: `main` and folder: `/ (root)`
4. Click **Save**
5. Wait 1–2 minutes → your game will be live!

---

## 📁 Project Structure

```
tic-tac-toe/
├── index.html      # Main page structure
├── style.css       # Beautiful dark UI + animations
├── script.js       # Complete game logic
├── README.md       # This file
└── .gitignore      # Ignores OS/editor files
```

---

## 🎯 How to Play

1. **Player X** always starts first
2. Players take turns clicking empty cells
3. First to get **3 in a row** (row, column or diagonal) wins
4. If the board fills with no winner → **Draw**
5. Click **New Game** to play again (scores stay)
6. Click **Reset Scores** to clear the scoreboard

---

## 🎨 Design Highlights

- Gradient title (cyan → pink)
- Distinct colors: **X = cyan**, **O = pink**
- Smooth “pop-in” animation when placing marks
- Winning cells glow and pulse
- Glass-style modal with backdrop blur
- Soft radial gradients in the background

---

## 📄 License

This project is open source and available under the MIT License.

---

Made with ❤️ using HTML, CSS & JavaScript
