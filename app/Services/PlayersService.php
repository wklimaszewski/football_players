<?php
namespace App\Services;


use Illuminate\Support\Facades\Storage;

class PlayersService {
    public $players;

    public function __construct(){
        $this->setUpList();
    }

    public function setUpList(): void{
        $players = Storage::get('players.json');

        $players = json_decode($players, true);

        $this->players = $players;
    }

    public function all(){
        return $this->players;
    }

    public function findPlayerById(int $id): array{
        $player = array_filter($this->players, function ($player) use ($id) {
            if($player["id"] == $id){
                return $player;
            }
        });

        return array_values($player)[0];
    }
}
