'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { criteriaService } from '../services/criteria.service';

export type CriteriaActionState = { error: string } | null;

const criteriaSchema = z.object({
  name: z.string().min(3, 'Minimal 3 karakter'),
  type: z.enum(['benefit', 'cost']),
  weight: z.number().min(0).max(1),
});

export async function createCriteriaAction(
  _prevState: CriteriaActionState,
  formData: FormData,
): Promise<CriteriaActionState> {
  const parsed = criteriaSchema.safeParse({
    name: formData.get('name') as string,
    type: formData.get('type') as string,
    weight: Number(formData.get('weight')),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const result = await criteriaService.create(parsed.data);
  if (!result.success) {
    return { error: result.error.message };
  }

  revalidatePath('/criteria');
  revalidatePath('/dashboard');
  revalidatePath('/');
  revalidatePath('/laptops/all');
  revalidatePath('/recomendations');
  revalidatePath('/laptops/detail/[id]', 'page');
  redirect('/criteria');
}

export async function updateCriteriaAction(
  id: string,
  _prevState: CriteriaActionState,
  formData: FormData,
): Promise<CriteriaActionState> {
  const parsed = criteriaSchema.safeParse({
    name: formData.get('name') as string,
    type: formData.get('type') as string,
    weight: Number(formData.get('weight')),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const result = await criteriaService.update(id, parsed.data);
  if (!result.success) {
    return { error: result.error.message };
  }

  revalidatePath('/criteria');
  revalidatePath('/dashboard');
  revalidatePath('/');
  revalidatePath('/laptops/all');
  revalidatePath('/recomendations');
  revalidatePath('/laptops/detail/[id]', 'page');
  redirect('/criteria');
}

export async function deleteCriteriaAction(
  id: string,
): Promise<CriteriaActionState> {
  const result = await criteriaService.delete(id);
  if (!result.success) {
    return { error: result.error.message };
  }

  revalidatePath('/criteria');
  revalidatePath('/dashboard');
  revalidatePath('/');
  revalidatePath('/laptops/all');
  revalidatePath('/recomendations');
  revalidatePath('/laptops/detail/[id]', 'page');
  return null;
}
