declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    ErrorDialog: typeof import('example/components/dialogs/ErrorDialog.vue').default;
    ConfirmationDialog: typeof import('example/components/dialogs/ConfirmationDialog.vue').default;
    TextBtn: typeof import('example/components/TextBtn.vue').default;
    Tag: typeof import('example/components/Tag.vue').default;
    LazyTag: typeof import('example/components/Tag.vue').default;
    LazyTextBtn: typeof import('example/components/TextBtn.vue').default;
    LazyConfirmationDialog: typeof import('example/components/dialogs/ConfirmationDialog.vue').default;
    LazyErrorDialog: typeof import('example/components/dialogs/ErrorDialog.vue').default;
  }
}
