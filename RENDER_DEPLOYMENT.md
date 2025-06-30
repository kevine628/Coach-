# 🚀 Guide pas à pas : Déploiement sur Render

## 📋 Prérequis

- Compte GitHub avec le code du projet (voir DEPLOYMENT.md pour l'upload)
- Compte Render : https://render.com
- (Optionnel) Un domaine personnalisé

---

## 1. Préparer le repository Git

Assure-toi que ton code est bien sur GitHub. Si ce n'est pas fait :

```bash
git init
git add .
git commit -m "Préparation pour Render"
git remote add origin https://github.com/ton-username/cluely-fr.git
git push -u origin main
```

---

## 2. Créer la base de données PostgreSQL sur Render

1. Va sur https://dashboard.render.com
2. Clique sur **New** > **PostgreSQL**
3. Donne un nom à ta base, choisis la région, puis crée-la
4. Une fois créée, clique sur la base puis sur **Connection** pour copier l'URL de connexion (format : `postgresql://...`)

---

## 3. Déployer l'application Web

1. Sur Render, clique sur **New** > **Web Service**
2. Choisis **Connect a repository** et connecte ton compte GitHub
3. Sélectionne le repo `cluely-fr`
4. Configure :
   - **Environment** : Node
   - **Build Command** :
     ```bash
     npm install
     npx prisma generate
     npx prisma db push
     npm run build
     ```
   - **Start Command** :
     ```bash
     npm start
     ```
   - **Root Directory** : laisse vide si le code est à la racine
5. Clique sur **Advanced** puis **Environment Variables** et ajoute :
   - `DATABASE_URL` = (ton URL Render PostgreSQL)
   - `JWT_SECRET` = (un secret fort)
   - `NODE_ENV` = production
   - (optionnel) `OPENAI_API_KEY`, `NEXT_PUBLIC_APP_URL`, etc.
6. Clique sur **Create Web Service**

---

## 4. Initialiser les achievements

Après le premier déploiement, va dans l'onglet **Shell** de Render (ou connecte-toi en SSH) et exécute :

```bash
node scripts/init-achievements.js
```

---

## 5. Accéder à ton site

- L'URL Render sera du type :
  `https://cluely-fr.onrender.com`
- Pour un domaine personnalisé :
  1. Va dans **Settings** > **Custom Domains**
  2. Ajoute ton domaine et suis les instructions DNS

---

## 🚨 Dépannage

- Consulte les logs Render pour toute erreur de build ou de démarrage.
- Pour les migrations Prisma, tu peux aussi utiliser le shell Render :
  ```bash
  npx prisma db push
  ```
- Vérifie que toutes les variables d'environnement sont bien définies.

---

## 📞 Support

- Documentation Render : https://render.com/docs
- Documentation Prisma : https://www.prisma.io/docs
- Issues GitHub : [ton-repo]/issues

---

**🎉 Ton site CoachIA est maintenant en ligne sur Render !** 