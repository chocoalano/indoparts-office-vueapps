<template>
    <v-row justify="center" class="space">
        <v-col cols="12" :md="md" :sm="sm" v-for="item in data" :key="item.id">
            <v-item>
                <v-card :color="active === item.id ? 'primary' : ''" class="d-flex align-center rounded-xl" height="200"
                    @click="active = item.id,$emit('callback', { act: active })">
                    <v-row>
                        <v-col cols="12" sm="12">
                            <v-list-item three-line class="mt-10">
                                <v-list-item-content>
                                    <div class="mb-4">
                                        <v-icon x-large :color="active === item.id ? 'white' : 'primary'" v-text="item.icon" />
                                    </div>
                                    <v-list-item-subtitle :class="active === item.id ? 'white--text' : ''"
                                        v-text="item.text" />
                                    <v-list-item-title class="headline mb-1"
                                        :class="active === item.id ? 'white--text' : ''">
                                        <strong>{{ item.count }}</strong> Data
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-col>
                    </v-row>
                </v-card>
            </v-item>
        </v-col>
    </v-row>
</template>
<script>
export default {
    props: {
        md: Number,
        sm: Number,
        data: Array,
    },
    data: () => ({
        active: 0,
    }),
}
</script>