-- Données de test pour CoachIA
-- Script d'insertion de données d'exemple

-- Insertion d'un utilisateur de test
INSERT INTO users (id, email, password_hash, first_name, last_name, plan) VALUES 
('550e8400-e29b-41d4-a716-446655440000', 'jean.dupont@email.com', '$2b$10$example_hash', 'Jean', 'Dupont', 'premium');

-- Insertion d'objectifs d'exemple
INSERT INTO objectives (user_id, title, description, progress, deadline, status, category, priority) VALUES 
('550e8400-e29b-41d4-a716-446655440000', 'Améliorer ma forme physique', 'Faire du sport 3 fois par semaine et adopter une alimentation équilibrée', 65, '2024-03-15', 'en_cours', 'Santé', 'haute'),
('550e8400-e29b-41d4-a716-446655440000', 'Apprendre le piano', 'Pratiquer 30 minutes par jour et maîtriser 5 morceaux classiques', 30, '2024-06-01', 'en_cours', 'Loisirs', 'moyenne'),
('550e8400-e29b-41d4-a716-446655440000', 'Lire 12 livres cette année', 'Lire au moins un livre par mois, varier les genres littéraires', 80, '2024-12-31', 'en_cours', 'Culture', 'basse'),
('550e8400-e29b-41d4-a716-446655440000', 'Méditation quotidienne', 'Méditer 10 minutes chaque matin pendant 3 mois', 100, '2024-02-28', 'termine', 'Bien-être', 'haute');

-- Insertion d'entrées de journal d'exemple
INSERT INTO journal_entries (user_id, title, content, mood, word_count) VALUES 
('550e8400-e29b-41d4-a716-446655440000', 'Une journée productive', 'Aujourd''hui j''ai réussi à terminer tous mes objectifs de la journée. J''ai fait ma séance de sport matinale, travaillé sur mon projet personnel pendant 2 heures, et pris le temps de lire avant de me coucher. Je me sens vraiment satisfait de cette journée bien remplie.', 'excellent', 65),
('550e8400-e29b-41d4-a716-446655440000', 'Réflexions sur l''équilibre vie-travail', 'Ces derniers jours, j''ai réfléchi à l''importance de l''équilibre entre vie professionnelle et personnelle. En France, nous avons cette culture du "savoir-vivre" qui me semble précieuse. J''aimerais mieux l''intégrer dans mon quotidien.', 'bon', 52),
('550e8400-e29b-41d4-a716-446655440000', 'Apprentissage du piano', 'Ma première leçon de piano s''est bien passée ! C''est difficile au début, mais j''adore découvrir cet instrument. Mon professeur m''a donné des exercices simples pour commencer. J''ai hâte de pouvoir jouer mes premiers morceaux.', 'excellent', 48);

-- Insertion de tâches quotidiennes d'exemple
INSERT INTO daily_tasks (user_id, title, completed, due_date) VALUES 
('550e8400-e29b-41d4-a716-446655440000', 'Séance de sport (30 min)', true, CURRENT_DATE),
('550e8400-e29b-41d4-a716-446655440000', 'Pratiquer le piano (20 min)', false, CURRENT_DATE),
('550e8400-e29b-41d4-a716-446655440000', 'Lire 10 pages', false, CURRENT_DATE),
('550e8400-e29b-41d4-a716-446655440000', 'Méditation (10 min)', true, CURRENT_DATE);

-- Insertion de tags pour le journal
INSERT INTO journal_tags (entry_id, tag) VALUES 
((SELECT id FROM journal_entries WHERE title = 'Une journée productive'), 'productivité'),
((SELECT id FROM journal_entries WHERE title = 'Une journée productive'), 'sport'),
((SELECT id FROM journal_entries WHERE title = 'Une journée productive'), 'lecture'),
((SELECT id FROM journal_entries WHERE title = 'Réflexions sur l''équilibre vie-travail'), 'réflexion'),
((SELECT id FROM journal_entries WHERE title = 'Réflexions sur l''équilibre vie-travail'), 'travail'),
((SELECT id FROM journal_entries WHERE title = 'Apprentissage du piano'), 'apprentissage'),
((SELECT id FROM journal_entries WHERE title = 'Apprentissage du piano'), 'piano');

-- Insertion de notifications d'exemple
INSERT INTO notifications (user_id, title, message, type, scheduled_for) VALUES 
('550e8400-e29b-41d4-a716-446655440000', 'Rappel objectif', 'N''oubliez pas votre séance de sport aujourd''hui !', 'reminder', NOW() + INTERVAL '1 hour'),
('550e8400-e29b-41d4-a716-446655440000', 'Suggestion IA', 'Votre assistant IA a de nouveaux conseils pour vous', 'ai_suggestion', NOW() + INTERVAL '2 hours'),
('550e8400-e29b-41d4-a716-446655440000', 'Journal quotidien', 'Prenez quelques minutes pour écrire dans votre journal', 'journal_reminder', NOW() + INTERVAL '8 hours');
