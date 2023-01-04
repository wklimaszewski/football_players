<template>
    <v-app>
        <v-card>
            <v-card-title>
                {{ player}}
            </v-card-title>
        </v-card>
    </v-app>
</template>

<script>
export default {
    data: () => ({

    }),
    props : {
        player : Number
    }
}
</script>
