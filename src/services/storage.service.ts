import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | Map<string, string> | null = null;
  private platformId = inject(PLATFORM_ID);

  private get storage(): Storage | Map<string, string> {
    if (this._storage === null) {
      this.initializeStorage();
    }
    // A asserção de não-nulo é segura porque initializeStorage sempre a define.
    return this._storage!; 
  }

  private initializeStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        // Um teste mais robusto para garantir que o localStorage esteja verdadeiramente disponível e gravável.
        const testKey = `__storage_test__${Date.now()}`;
        localStorage.setItem(testKey, 'test');
        localStorage.removeItem(testKey);
        this._storage = localStorage;
      } catch (e) {
        // Fallback para armazenamento em memória se ocorrer algum erro.
        console.warn(
          'localStorage is not available due to security restrictions. Falling back to in-memory storage for this session.'
        );
        this._storage = new Map<string, string>();
      }
    } else {
      // Para plataformas que não são de navegador, sempre use armazenamento em memória.
      this._storage = new Map<string, string>();
    }
  }

  getItem(key: string): string | null {
    const storage = this.storage; // Acessar via getter para acionar a inicialização
    if (storage instanceof Map) {
      return storage.get(key) ?? null;
    }
    return storage.getItem(key);
  }

  setItem(key: string, value: string): void {
    const storage = this.storage; // Acessar via getter
    if (storage instanceof Map) {
      storage.set(key, value);
    } else {
      storage.setItem(key, value);
    }
  }

  removeItem(key: string): void {
    const storage = this.storage; // Acessar via getter
    if (storage instanceof Map) {
      storage.delete(key);
    } else {
      storage.removeItem(key);
    }
  }
}
