<template>
    <section>
        <left-bar-components/>
        <right-bar-components/>
        <v-container>
            <v-toolbar flat color="rgba(0,0,0,0)">
                <v-btn icon @click="setleft">
                    <v-icon>mdi-menu</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-text-field label="Search on maufarm" class="pt-5 d-none d-sm-flex" filled
                    prepend-inner-icon="mdi-magnify" solo flat background-color="transparent" rounded outlined>
                </v-text-field>
                <v-spacer></v-spacer>
                <v-btn icon @click="toggleDarkMode">
                    <v-icon>mdi-theme-light-dark</v-icon>
                </v-btn>
                <v-btn icon @click="setright">
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
            </v-toolbar>
        </v-container>
    </section>
</template>
<script>
import { mapState } from "vuex";
import LeftBarComponents from '@/components/LeftBarComponents.vue';
import RightBarComponents from '@/components/RightBarComponents.vue';
export default {
    components: {
        LeftBarComponents,
        RightBarComponents
    },
    methods: {
        toggleDarkMode: function () {
            this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
            localStorage.setItem("darkTheme", this.$vuetify.theme.dark.toString());
        },
        setleft() {
            this.$store.commit("SET_LEFTDRAWER", !this.leftdrawer, { root: true })
        },
        setright() {
            this.$store.commit("SET_RIGHTDRAWER", !this.rightdrawer, { root: true })
        }
    },
    mounted() {
        const theme = localStorage.getItem("darkTheme");
        if (theme) {
            if (theme === "true") {
                this.$vuetify.theme.dark = true;
            } else {
                this.$vuetify.theme.dark = false;
            }
        } else if (
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
        ) {
            this.$vuetify.theme.dark = true;
            localStorage.setItem(
                "darkTheme",
                this.$vuetify.theme.dark.toString()
            );
        }
    },
    computed: {
        ...mapState(["leftdrawer", "rightdrawer"]),
        leftdrawer: {
            get: function () {
                return this.$store.state.leftdrawer;
            },
            set: function (value) {
                this.$store.commit("SET_LEFTDRAWER", value);
            },
        },
        rightdrawer: {
            get: function () {
                return this.$store.state.rightdrawer;
            },
            set: function (value) {
                this.$store.commit("SET_RIGHTDRAWER", value);
            },
        },
    }
}
</script>