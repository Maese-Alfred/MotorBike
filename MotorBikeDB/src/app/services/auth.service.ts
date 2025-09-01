import { Injectable, inject } from '@angular/core';
import { 
  Auth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail,
  signOut, 
  User,
  user 
} from '@angular/fire/auth';
import { Observable, firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../app/environments/firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth = inject(Auth);
  private http = inject(HttpClient);

  user$: Observable<User | null>;

  constructor() {
    this.user$ = user(this.auth);
  }

  async login(email: string, password: string): Promise<User | null> {
    const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
    return userCredential.user ?? null;
  }

  async register(email: string, password: string, newUser: any): Promise<User | null> {
    try {
      // 1. Registrar en Firebase
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const firebaseUser = userCredential.user;

      if (!firebaseUser) return null;

      // 2. Armar objeto usuario para backend
      const userToSave = {
        ...newUser,
        uid_firebase: firebaseUser.uid
      };

      // 3. Guardar en backend (ajusta la URL)
      console.log('Guardando usuario en backend:', userToSave);
      await firstValueFrom(this.http.post(`${environment.apiUrl}/usuarios/crear`, userToSave));

      return firebaseUser;
    } catch (error) {
      console.error("Error en registro:", error);
      throw error;
    }
  }

  async resetPassword(email: string): Promise<void> {
  try {
    await sendPasswordResetEmail(this.auth, email);
    console.log(`Correo de recuperación enviado a: ${email}`);
  } catch (error) {
    console.error("Error al enviar correo de recuperación:", error);
    throw error;
  }
}

  async logout(): Promise<void> {
    return await signOut(this.auth);
  }

  getCurrentUser(): Observable<User | null> {
    return this.user$;
  }

  getUid(): string | null {
    return this.auth.currentUser ? this.auth.currentUser.uid : null;
  }
}