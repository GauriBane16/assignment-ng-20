import { Directive, Input, Output, EventEmitter, signal, ElementRef } from '@angular/core';

@Directive({
  selector: '[appEditableCell]',
  standalone: true,
  exportAs: 'appEditableCell',
  host: {
    '(click)': 'handleClick($event)'
  }
})
export class EditableCell {
  @Input({ required: true }) user!: any;
  @Input({ required: true }) field!: string;
  @Input({ required: true }) saveFn!: (user: any, field: string) => void;
  @Output() editingChange = new EventEmitter<boolean>();

  editing = signal(false);
  private originalValue: any;
  private clickTimer: any;

  constructor(private el: ElementRef<HTMLElement>) {}

  handleClick(event: MouseEvent) {
    clearTimeout(this.clickTimer);

    if (event.detail === 1) {
      this.clickTimer = setTimeout(() => {
        this.startEdit(event);
      }, 200);
    }
  }

  cancelClick() {
    clearTimeout(this.clickTimer);
  }

  private startEdit(event: Event) {
    event.stopPropagation();
    this.originalValue = this.user[this.field];
    this.editing.set(true);
    this.editingChange.emit(true);

    setTimeout(() => {
      if (this.editing()) {
        const input = this.el.nativeElement.querySelector('input[data-edit]') as HTMLInputElement | null;
        input?.focus();
      }
    });
  }

  onInputBlur() { this.saveAndClose(); }

  onEnter(event: Event) {
    event.preventDefault();
    this.saveAndClose();
  }

  onEscape(event: Event) {
    event.preventDefault();
    this.user[this.field] = this.originalValue;
    this.editing.set(false);
    this.editingChange.emit(false);
  }

  private saveAndClose() {
    if (this.editing()) {
      this.saveFn(this.user, this.field);
      this.editing.set(false);
      this.editingChange.emit(false);
    }
  }
}