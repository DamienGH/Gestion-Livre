# Gestion-Livre
** Version Alpha **

Appli de gestion de collection de livre dont la base est tirée de la formation "Développez des applications Web avec Angular" d'OpenClassRoom: https://openclassrooms.com/fr/courses/4668271-developpez-des-applications-web-avec-angular

Améliorations les plus importantes apportées : 
- Compatibilité Angular 12
- Scanner de code barre : permet de récupérer le code ISBN propre à chaque livre. Utilisation de la librairie [zxing](https://github.com/zxing/zxing) ** Peut être capricieux suivant la caméra utilisée, suivant a priori la résolution de la caméra, marche parfaitement avec certain téléphone, moins avec d'autres. A améliorer **
- Interfaçage avec Google Book API : permet de renseigner automatiquement les informations des livres (Titre, Auteurs, Synopsis) à partir du code ISBN
