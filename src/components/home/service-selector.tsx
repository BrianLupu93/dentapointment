import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function ServiceSelector() {
  return (
    <ToggleGroup
      type='single'
      size='sm'
      variant='outline'
      spacing={2}
      className='flex flex-wrap'
    >
      <ToggleGroupItem value='top' aria-label='Toggle top'>
        Consultation
      </ToggleGroupItem>
      <ToggleGroupItem value='bottom' aria-label='Toggle bottom'>
        Consultation
      </ToggleGroupItem>
      <ToggleGroupItem value='left' aria-label='Toggle left'>
        Consultation
      </ToggleGroupItem>
      <ToggleGroupItem value='right' aria-label='Toggle right'>
        Consultation
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
