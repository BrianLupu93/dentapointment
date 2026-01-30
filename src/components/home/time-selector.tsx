import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function TimeSelector() {
  return (
    <ToggleGroup
      type='single'
      size='sm'
      defaultValue='top'
      variant='outline'
      spacing={2}
      className='flex flex-wrap'
    >
      <ToggleGroupItem value='top' aria-label='Toggle top'>
        08:00
      </ToggleGroupItem>
      <ToggleGroupItem value='bottom' aria-label='Toggle bottom'>
        09:40
      </ToggleGroupItem>
      <ToggleGroupItem value='left' aria-label='Toggle left'>
        15:30
      </ToggleGroupItem>
      <ToggleGroupItem value='right' aria-label='Toggle right'>
        16:00
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
