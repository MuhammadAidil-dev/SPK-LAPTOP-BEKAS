'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { laptopService } from '../services/laptop.service';

export type LaptopActionState = { error: string } | null;

const laptopSchema = z.object({
  name: z.string().min(3, 'Nama Minimal 3 karakter'),
  brand: z.string().min(1, 'Brand wajib diisi'),
  price: z.number().min(0),
  processor_score: z.number().min(0),
  gpu_score: z.number().min(0),
  ram: z.number().min(0),
  storage: z.number().min(0),
  condition: z.number().int().min(1).max(5),
  age_months: z.number().int().min(0),
  screen_size: z.number().min(0),
  battery_life: z.number().min(0),
});

function buildFormData(source: FormData): FormData {
  const data = new FormData();
  const fields = [
    'name',
    'brand',
    'price',
    'processor_score',
    'gpu_score',
    'ram',
    'storage',
    'condition',
    'age_months',
    'screen_size',
    'battery_life',
  ];
  for (const field of fields) {
    const val = source.get(field);
    if (val !== null) data.append(field, val);
  }
  const image = source.get('image') as File | null;
  if (image && image.size > 0) {
    data.append('image', image);
  }
  return data;
}

export async function createLaptopAction(
  _prevState: LaptopActionState,
  formData: FormData,
): Promise<LaptopActionState> {
  const parsed = laptopSchema.safeParse({
    name: formData.get('name') as string,
    brand: formData.get('brand') as string,
    price: Number(formData.get('price')),
    processor_score: Number(formData.get('processor_score')),
    gpu_score: Number(formData.get('gpu_score')),
    ram: Number(formData.get('ram')),
    storage: Number(formData.get('storage')),
    condition: Number(formData.get('condition')),
    age_months: Number(formData.get('age_months')),
    screen_size: Number(formData.get('screen_size')),
    battery_life: Number(formData.get('battery_life')),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const result = await laptopService.create(buildFormData(formData));
  if (!result.success) {
    return { error: result.error.message };
  }

  revalidatePath('/laptops');
  redirect('/laptops?toast=added');
}

export async function updateLaptopAction(
  id: string,
  _prevState: LaptopActionState,
  formData: FormData,
): Promise<LaptopActionState> {
  const parsed = laptopSchema.safeParse({
    name: formData.get('name') as string,
    brand: formData.get('brand') as string,
    price: Number(formData.get('price')),
    processor_score: Number(formData.get('processor_score')),
    gpu_score: Number(formData.get('gpu_score')),
    ram: Number(formData.get('ram')),
    storage: Number(formData.get('storage')),
    condition: Number(formData.get('condition')),
    age_months: Number(formData.get('age_months')),
    screen_size: Number(formData.get('screen_size')),
    battery_life: Number(formData.get('battery_life')),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const result = await laptopService.update(id, buildFormData(formData));
  if (!result.success) {
    return { error: result.error.message };
  }

  revalidatePath('/laptops');
  revalidatePath(`/laptops/${id}`);
  redirect('/laptops?toast=updated');
}

export async function deleteLaptopAction(
  id: string,
): Promise<LaptopActionState> {
  const result = await laptopService.delete(id);
  if (!result.success) {
    return { error: result.error.message };
  }

  revalidatePath('/laptops');
  return null;
}
