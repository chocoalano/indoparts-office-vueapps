<template>
    <v-app v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
        <app-bar-components></app-bar-components>
        <v-container>
            <h1>NOTIFIKASI</h1>
            <v-divider></v-divider>
            <v-container>
                <v-card v-for="i in data" :key="i.id" class="mt-5">
                    <v-card-text>
                        <p v-text="i.id"></p>
                        <p v-text="i.user_id"></p>
                        <p v-text="i.note_action"></p>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary">cek sekarang</v-btn>
                    </v-card-actions>
                </v-card>
            </v-container>
        </v-container>
    </v-app>
</template>

<script>
import AppBarComponents from '@/components/AppBarComponents';
import { mapActions } from 'vuex';
export default {
    components: {
        AppBarComponents
    },
    data: () => ({
        data: [],
        total: 0,
        busy: false,
        last: 0,
        options: {
            sortBy: '',
            sortDesc: false,
            page: 1,
            itemsPerPage: 10,
            search: '',
        }
    }),
    mounted() {
        this.loadMore()
    },
    methods: {
        ...mapActions("notification", ["index"]),
        loadMore: function () {
            if (this.page != this.last) {
                this.busy = true;
                this.index(this.options).then((res) => {
                    this.total = res.data.meta.total;
                    this.data=res.data.data
                    var regex = /\d+/g
                    var string = res.data.meta.next_page_url
                    var matches = string.match(regex)
                    this.options.page = parseInt(matches)
                    this.last = parseInt(res.data.meta.last_page)
                    this.busy = false;
                })
            }
        }
    }
}
</script>