new Vue({
    el: "#app",
    data:{
        isGameStarted: false,
        isGameOver: false,
        playerHealth: 100,
        monsterHealth: 100,
        logs: []
    },
    computed:{
        result(){
            let txt = 'Você ganhou! :D';
            let cls = 'is-success';
            if (this.playerHealth <= 0){
                txt = 'Você perdeu! :(';
                cls = 'is-danger';
            }
            return {
                txt,cls
            }
        }
    },
    methods:{
        start(){
            this.isGameStarted = true;
            this.isGameOver = false;
            this.logs = [];
        },
        quit(){
            this.isGameStarted = false;
            this.isGameOver = false;
            this.logs = [];
            this.playerHealth = 100;
            this.monsterHealth = 100;
        },
        attack (special){
            let pointAttacked = randomIntFromInterval(3,8);
            if (special){
                pointAttacked+= randomIntFromInterval(2,5)
            }
            this.monsterHealth = this.removeHealth(this.monsterHealth,pointAttacked);
            this.registerLog('Jogador atingiu monstro com '+pointAttacked,'is-success');
            this.monsterAttack()
        },
        heal(){
            let health = this.playerHealth;
            let recoveredHealth = randomIntFromInterval(15,20);
            let newHealth = health + recoveredHealth;
            if (newHealth > 100 ){
                this.playerHealth = 100;
            }else{
                this.playerHealth = newHealth;
            }
            this.registerLog('Jogador curou '+recoveredHealth,'is-success');
            this.monsterAttack()
        },
         monsterAttack(){
            let pointAttacked = randomIntFromInterval(5,10);
            if (!this.isGameOver){
                this.playerHealth = this.removeHealth(this.playerHealth,pointAttacked);
                this.registerLog('Monstro atingiu jogador com '+pointAttacked,'is-danger');
            }
        },
        removeHealth(health, hit){  
            if ((health - hit) <= 0){
                this.isGameOver = true;
                return 0;
            }else{
                return (health-hit);
            }
        },
        registerLog(txt, cls){
            this.logs.unshift({txt, cls});
            console.log(this.logs);
        }
    }
});


function randomIntFromInterval(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }