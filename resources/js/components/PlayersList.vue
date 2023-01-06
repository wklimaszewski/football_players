<template>
<v-app>
    <v-card v-if="selected_item === null" dark>
        <v-toolbar color="orange" dark>
            <v-toolbar-title>Lista zawodników</v-toolbar-title>

            <v-spacer></v-spacer>
        </v-toolbar>

        <v-list three-line>

            <template v-for="(item, index) in items">

                <v-divider></v-divider>

                <v-list-item :key="item.id" @click="selected_item = item">
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
    <v-card v-else dark>
        <v-btn class="my-2" dense outlined color="orange" @click="selected_item=null"><v-icon>mdi-undo</v-icon>Wróc do listy zawodników</v-btn>
        <v-row>
            <v-col sm="12" md="6" lg="6">
                <v-img contain :src="selected_item.avatar"></v-img>
            </v-col>
            <v-col sm="12" md="6" lg="6">
                <v-card class="mx-2" dark>
                    <v-card-title>{{ selected_item.first_name + " " + selected_item.last_name }}</v-card-title>
                    <v-divider />
                    <v-card-text>
                        <v-row>
                            <v-col>
                                <v-text-field outlined dense label="Narodowość" :value="selected_item.national" readonly></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field outlined dense label="Pozycja" :value="selected_item.position" readonly></v-text-field>
                            </v-col>

                        </v-row>
                        <v-row>
                            <v-col>
                                <v-text-field dense outlined label="Wiek" :value="selected_item.age" readonly>
                                </v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field dense outlined label="Wzrost" :value="selected_item.height" readonly>
                                </v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field dense outlined label="Waga" :value="selected_item.weight" readonly>
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-btn outlined color="red" @click="dialog_club=true">
                            <v-icon>mdi-shield-star</v-icon>{{ selected_item.club.name  }}
                        </v-btn>
                    </v-card-text>
                </v-card>

                <v-btn class="mt-2" color="success" block @click="dialog_stats = true">
                    <v-icon>mdi-note-search</v-icon>Statystyki
                </v-btn>
            </v-col>
        </v-row>
    </v-card>

    <v-dialog v-model="dialog_club" max-width="600">
        <v-card dark>
            <v-card-title>
                Klub
            </v-card-title>
            <v-divider />
            <v-card-text>
                <v-subheader>Nazwa</v-subheader>
                <v-chip class="ms-2" color="orange" v-if="selected_item != null">{{ selected_item.club.name }}</v-chip>
                <v-subheader>Kraj</v-subheader>
                <v-chip class="ms-2" color="orange" v-if="selected_item != null">{{ selected_item.club.country }}</v-chip>
                <v-subheader>Liga</v-subheader>
                <v-chip class="ms-2" color="orange" v-if="selected_item != null">{{ selected_item.club.league }}</v-chip>
                <v-subheader>Data utworzenia</v-subheader>
                <v-chip class="ms-2" color="orange" v-if="selected_item != null">{{ selected_item.club.year_created }}</v-chip>
            </v-card-text>
            <v-divider />
            <v-card-actions>
                <v-btn text color="red" @click="dialog_club=false">Zamknij</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog v-model="dialog_stats" max-width="400">
        <v-card dark>
            <v-card-title>
                Statystyki
            </v-card-title>
            <v-divider />
            <v-card-text>
                <v-simple-table v-if="selected_item!=null">
                    <tbody>
                        <tr>
                            <td class="text-left">
                                Mecze
                            </td>
                            <td class="text-right">
                                <v-chip dense color="teal darken-3">{{ selected_item.statistics.matches }}</v-chip>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-left">
                                Bramki
                            </td>
                            <td class="text-right">
                                <v-chip dense color="purple">{{ selected_item.statistics.goals }}</v-chip>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-left">
                                Asysty
                            </td>
                            <td class="text-right">
                                <v-chip dense color="primary">{{ selected_item.statistics.assists }}</v-chip>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-left">
                                Zółte kartki
                            </td>
                            <td class="text-right">
                                <v-chip dense color="yellow accent-4">{{ selected_item.statistics.yellow_cards }}</v-chip>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-left">
                                Czerwone kartki
                            </td>
                            <td class="text-right">
                                <v-chip dense color="red">{{ selected_item.statistics.red_cards }}</v-chip>
                            </td>
                        </tr>
                    </tbody>
                </v-simple-table>
            </v-card-text>
            <v-divider />
            <v-card-actions>
                <v-btn text color="red" @click="dialog_stats=false">Zamknij</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</v-app>
</template>

<script>
export default {
    data: () => ({
        items: null,
        selected_item: null,
        dialog_club: false,
        dialog_stats: false
    }),
    methods: {
        loadData: function () {
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
