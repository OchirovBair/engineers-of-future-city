import * as Dialog from '@radix-ui/react-dialog'
import './OutcomeDialog.css'
import type { Outcome } from '../config/outcomes'

interface Props {
  open: boolean
  outcome: Outcome | null
  onClose: () => void
}

export function OutcomeDialog({ open, outcome, onClose }: Props) {
  const isFailure = outcome?.danger === true

  return (
    <Dialog.Root open={open} onOpenChange={(v) => { if (!v) onClose() }}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content
          className="dialog-content"
          style={
            outcome
              ? { backgroundImage: `url(${outcome.image})` }
              : undefined
          }
          aria-describedby="dialog-desc"
        >
          <div className="dialog__body">
            <Dialog.Title
              className={`dialog__title${isFailure ? ' dialog__title--failure' : ''}`}
            >
              {outcome?.title ?? '—'}
            </Dialog.Title>
            <Dialog.Description id="dialog-desc" className="dialog__desc">
              {outcome?.description ?? ''}
            </Dialog.Description>
          </div>

          <Dialog.Close asChild>
            <button className="dialog__close" aria-label="Закрыть">
              ✕
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
