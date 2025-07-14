import { NextResponse } from 'next/server';

import { getAvatarPaths } from '@/shared/lib/getAvatarPaths';

import type { TypeAvatarsMap } from '@/shared/lib/getAvatarPaths';
import { console } from 'inspector';

export async function GET(): Promise<NextResponse<TypeAvatarsMap | null>> {
  try {
    const response = getAvatarPaths();
    return NextResponse.json(response as TypeAvatarsMap);
  } catch (error) {
    console.error('getAvatarPaths / error -', error);
    return NextResponse.json(null);
  }
}
