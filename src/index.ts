import useOnMounted from '@/hooks/useOnMounted';
import useOnUpdated from '@/hooks/useOnUpdated';
import useOnUnmounted from '@/hooks/useOnUnmounted';
import CanvasEngine from '@/components/CanvasEngine';
import GameObject from '@/components/GameObject';

export type { GameObject as GameObjectType } from '@/types/GameObject';
export { useOnMounted, useOnUpdated, useOnUnmounted, CanvasEngine, GameObject };
