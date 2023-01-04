<template>
    <v-app>
            <v-card
                v-if="selected_item === null"
                dark
            >
                <v-toolbar
                    color="orange"
                    dark
                >
                    <v-toolbar-title>Lista zawodników</v-toolbar-title>

                    <v-spacer></v-spacer>
                </v-toolbar>

                <v-list three-line>

                    <template v-for="(item, index) in items">


                        <v-divider
                        ></v-divider>

                        <v-list-item
                            :key="item.id"
                            @click="selected_item = item"
                        >
                            <v-list-item-avatar>
                                <v-img :src="item.avatar"></v-img>
                            </v-list-item-avatar>

                            <v-list-item-content>
                                <v-list-item-title>{{ item.first_name + " " + item.last_name}}</v-list-item-title>
                                <v-list-item-subtitle v-html="item.national"></v-list-item-subtitle>
                            </v-list-item-content>
                            <v-list-item-action>
                                <v-avatar color="primary" tile>
                                    {{ item.position }}
                                </v-avatar>
                            </v-list-item-action>
                        </v-list-item>
                    </template>
                </v-list>
            </v-card>
            <v-card v-else>
                <v-row>
                <v-col sm="12" md="6" lg="6">
                    <v-img contain
                        :src="selected_item.avatar"
                    ></v-img>
                </v-col>
                <v-col sm="12" md="6" lg="6">
                    <v-card>
                    <v-card-title>{{ selected_item.first_name + " " + selected_item.last_name }}</v-card-title>
                        <v-divider/>
                    <v-card-text>
                        <v-list flat>
                            <v-subheader>Informacje o zawodniku</v-subheader>
                                <v-text-field outlined label="Narodowość" :value="selected_item.national" readonly>
                                </v-text-field>
                            <v-text-field outlined label="Narodowość" :value="selected_item.national" readonly>
                            </v-text-field>
                            <v-divider/>

                            <v-list-item
                            >
                                <v-list-item-icon>
                                    <v-icon>mdi-flag</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>{{ selected_item.national }}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>

                        <div class="my-4 text-subtitle-1">
                            $ • Italian, Cafe
                        </div>

                        <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
                    </v-card-text>

                    <v-divider class="mx-4"></v-divider>

                    <v-card-title>Tonight's availability</v-card-title>

                    <v-card-text>
                        <v-chip-group
                            v-model="selection"
                            active-class="deep-purple accent-4 white--text"
                            column
                        >
                            <v-chip>5:30PM</v-chip>

                            <v-chip>7:30PM</v-chip>

                            <v-chip>8:00PM</v-chip>

                            <v-chip>9:00PM</v-chip>
                        </v-chip-group>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn
                            color="deep-purple lighten-2"
                            text
                        >
                            Reserve
                        </v-btn>
                    </v-card-actions>
                    </v-card>
                </v-col>
                </v-row>
            </v-card>
    </v-app>
</template>

<script>
export default {
    data: () => ({
        items: null,
        selected_item: null
    }),
    methods: {
        loadData: function (){
            axios.get('players')
                .then(response => {
                    this.items = response.data;
                })
        }
    },
    mounted() {
        this.loadData();
    }
}
</script>
