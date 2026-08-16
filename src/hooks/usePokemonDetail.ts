import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { type PokemonDetail } from "@/Services/PokemonInterface";
import {
  GENERIC_DETAIL_ERROR_MESSAGE,
  REQUEST_TIMEOUT_MS,
  TIMEOUT_MESSAGE,
} from "@/constants";
import { isTimeout } from "@/utils/axios";

interface UsePokemonDetailResult {
  selectedPokemon: PokemonDetail | null;
  modalOpen: boolean;
  detailError: string | null;
  openPokemonDetail: (url: string) => void;
  retryDetail: () => void;
  closeModal: () => void;
}

/**
 * Manages the detail modal: opens it immediately, fetches the selected
 * Pokémon's details (aborting any previous request) and exposes retry/close.
 */
export function usePokemonDetail(): UsePokemonDetailResult {
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetail | null>(
    null
  );
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [detailError, setDetailError] = useState<string | null>(null);
  const detailUrlRef = useRef<string | null>(null);
  const detailAbortRef = useRef<AbortController | null>(null);

  // Abort any in-flight detail request when the component unmounts.
  useEffect(() => {
    return () => {
      detailAbortRef.current?.abort();
    };
  }, []);

  const openPokemonDetail = (url: string): void => {
    detailUrlRef.current = url;
    setSelectedPokemon(null);
    setDetailError(null);
    setModalOpen(true);

    // Abort any in-flight detail request so a slow response for a previous
    // Pokémon can't overwrite the newly selected one.
    detailAbortRef.current?.abort();
    const controller = new AbortController();
    detailAbortRef.current = controller;

    void axios
      .get<PokemonDetail>(url, {
        signal: controller.signal,
        timeout: REQUEST_TIMEOUT_MS,
      })
      .then((response) => {
        setSelectedPokemon(response.data);
      })
      .catch((err: unknown) => {
        if (axios.isCancel(err)) {
          return;
        }
        console.error("Error fetching Pokemon detail:", err);
        setDetailError(
          isTimeout(err) ? TIMEOUT_MESSAGE : GENERIC_DETAIL_ERROR_MESSAGE
        );
      });
  };

  const retryDetail = (): void => {
    if (detailUrlRef.current) {
      openPokemonDetail(detailUrlRef.current);
    }
  };

  const closeModal = (): void => {
    setModalOpen(false);
  };

  return {
    selectedPokemon,
    modalOpen,
    detailError,
    openPokemonDetail,
    retryDetail,
    closeModal,
  };
}
