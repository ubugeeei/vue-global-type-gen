declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    ErrorDialog: typeof import('test/stub/components/dialogs/ErrorDialog.vue').default;
    ConfirmationDialog: typeof import('test/stub/components/dialogs/ConfirmationDialog.vue').default;
    TextBtn: typeof import('test/stub/components/TextBtn.vue').default;
    Tag: typeof import('test/stub/components/Tag.vue').default;
    LazyTag: typeof import('test/stub/components/Tag.vue').default;
    LazyTextBtn: typeof import('test/stub/components/TextBtn.vue').default;
    LazyConfirmationDialog: typeof import('test/stub/components/dialogs/ConfirmationDialog.vue').default;
    LazyErrorDialog: typeof import('test/stub/components/dialogs/ErrorDialog.vue').default;
  }
}
