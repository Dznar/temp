<script lang="ts">
  import type { CVData } from './types';
  import PhotoModern from './templates/PhotoModern.svelte';
  import PhotoHeader from './templates/PhotoHeader.svelte';
  import PhotoCircle from './templates/PhotoCircle.svelte';
  import PhotoCorner from './templates/PhotoCorner.svelte';
  import Elegant from './templates/Elegant.svelte';
  import Minimal from './templates/Minimal.svelte';
  import Modern from './templates/Modern.svelte';
  import Classic from './templates/Classic.svelte';
  import Creative from './templates/Creative.svelte';
  import Tech from './templates/Tech.svelte';
  import Executive from './templates/Executive.svelte';
  import Compact from './templates/Compact.svelte';
  import Clean from './templates/Clean.svelte';
  import Professional from './templates/Professional.svelte';
  import Monochrome from './templates/Monochrome.svelte';
  import Dark from './templates/Dark.svelte';

  export let cvData: CVData;
  export let template: string;
</script>

{#if template === 'photo-modern'}
  <PhotoModern {cvData} />
{:else if template === 'photo-header'}
  <PhotoHeader {cvData} />
{:else if template === 'photo-circle'}
  <PhotoCircle {cvData} />
{:else if template === 'photo-corner'}
  <PhotoCorner {cvData} />
{:else if template === 'elegant'}
  <Elegant {cvData} />
{:else if template === 'minimal'}
  <Minimal {cvData} />
{:else if template === 'modern'}
  <Modern {cvData} />
{:else if template === 'classic'}
  <Classic {cvData} />
{:else if template === 'creative'}
  <Creative {cvData} />
{:else if template === 'tech'}
  <Tech {cvData} />
{:else if template === 'executive'}
  <Executive {cvData} />
{:else if template === 'compact'}
  <Compact {cvData} />
{:else if template === 'clean'}
  <Clean {cvData} />
{:else if template === 'professional'}
  <Professional {cvData} />
{:else if template === 'monochrome'}
  <Monochrome {cvData} />
{:else if template === 'dark'}
  <Dark {cvData} />
{/if}
