<template> <div class="bg-primary" v-touch-pan.horizontal.prevent.mouse.preserveCursor="handlePan" /> </template>

<script> export default { props : { handlePan : Function } } </script>

<style lang = "scss" scoped > ::v-deep{
    width    : 5px        ;
    height   : 100%       ;
    right    : -5px       ;
    position : absolute   ;
    cursor   : col-resize ;
} </style>