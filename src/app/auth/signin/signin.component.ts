import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


/**
 * Composant permettant l'authentification d'un utilisateur
 */
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
})
export class SigninComponent implements OnInit {

  signinForm!: FormGroup;
  errorMessage!: string;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  /**
   * Initialisation du formulaire d'authentification d'un utilisateur
   * @var email : validation classique de mail
   * @var password : 6 caractères alphanumériques
   */
  initForm() {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  /**
   * Action de validation du formulaire d'authentification d'un utilisateur.
   * Si l'authentification est OK navigation vers le composant des Livres
   * Si non : affichage erreur de firebase dans le template
   */
  onSubmit() {
    //Assertion d'assignation pour les 2 lignes ci-dessous car il y a des Validators.requird dans l'initForm()
    const email = this.signinForm.get('email')!.value;
    const password = this.signinForm.get('password')!.value;
    
    this.authService.signInUser(email, password).then(
      () => {
        this.router.navigate(['/books']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }
}