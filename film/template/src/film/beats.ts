import { END_CARD_SECONDS } from './kit/EndCard';

/**
 * The master take's beats, in seconds. Every scene reads its times from here, so moving a beat moves the whole film
 * coherently. Add your own beats between `reveal` and `end`.
 */
export const B = {
  reveal: 0.3, // the brand reveal (BrandReveal): 7.2 s
  story0: 7.6, // your first scene
  story1: 15.5,
  end: 15.8, // the end card (EndCard)
};

/** The master take's length: every cut plays stretches of it. */
export const MASTER_SECONDS = B.end + END_CARD_SECONDS;
