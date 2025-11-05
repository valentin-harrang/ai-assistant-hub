"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * Hook personnalisé pour gérer le localStorage de manière synchrone
 * Gère automatiquement l'hydratation SSR et la synchronisation
 *
 * @param key - Clé du localStorage
 * @param initialValue - Valeur initiale si la clé n'existe pas
 * @returns Tuple [value, setValue] similaire à useState
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  // État pour la valeur actuelle
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  // État pour suivre l'hydratation (éviter les différences SSR/client)
  const [isHydrated, setIsHydrated] = useState(false);

  // Charger la valeur depuis localStorage au montage
  useEffect(() => {
    if (typeof window === "undefined") {
      setIsHydrated(true);
      return;
    }

    try {
      const item = localStorage.getItem(key);
      if (item !== null) {
        const parsed = JSON.parse(item) as T;
        setStoredValue(parsed);
      }
    } catch (error) {
      console.warn(`Erreur lors du chargement de ${key} depuis localStorage:`, error);
      // En cas d'erreur, garder la valeur initiale
    } finally {
      setIsHydrated(true);
    }
  }, [key]);

  // Fonction pour mettre à jour la valeur (synchrone avec localStorage)
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      if (!isHydrated) return;

      try {
        // Permettre la fonction de mise à jour comme useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;

        setStoredValue(valueToStore);

        // Sauvegarder dans localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (error) {
        console.warn(`Erreur lors de la sauvegarde de ${key} dans localStorage:`, error);
      }
    },
    [key, storedValue, isHydrated]
  );

  return [storedValue, setValue];
}

