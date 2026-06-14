'use server';

import { revalidatePath } from 'next/cache';

export async function recalculateAction() {
  revalidatePath('/recomendations');
  revalidatePath('/laptops/all');
  revalidatePath('/');
}
