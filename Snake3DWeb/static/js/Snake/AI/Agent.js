class SnakeAgent{
    constructor() {
        this.actions = ['a', 'w', 's', 'd', 'none'];
        this.currentCell = "b";
    }

    read_state(env_elements){
        `
            This function has the main purpose 
            to return the direction of the snake to the apple as a target.
            Also sense the cells next to the snake.
            [
            x_direction_to_apple,
            y_direction_to_apple,
            z_direction_to_apple,
            positive_x_cell_type,
            negative_x_cell_type,
            positive_y_cell_type,
            negative_y_cell_type,
            positive_z_cell_type,
            negative_z_cell_type,
            ]
        `
        let pos_x = Math.round(snake.body[0].position.x),
            pos_y = Math.round(snake.body[0].position.y),
            pos_z = Math.round(snake.body[0].position.z);

        this.currentCell = this.check_current_cell(env_elements["dangerPos"],
                                            [pos_x,pos_y,pos_z]);
        if(this.currentCell === 'd' ){
            return "loosing_state";
        }

        let cell_if_action = {"a":"b","w":"b","s":"b","d":"b","none":"b"},
            direction,scope;

        for(let i=0;i<this.actions.length;i++){
            direction = snake.directionController["USER"][this.actions[i]]
            if(direction[0]!==0){
                  scope = pos_x+direction[0];
                  if(scope >x-1 || scope<0 || this.will_position_in_tail([scope,pos_y,pos_z]) ){
                    cell_if_action[this.actions[i]] = "d";
                }
            }else if(direction[1]!==0){
                   scope = pos_y+direction[1];
                   if(scope >y-1 || scope<0 || this.will_position_in_tail([pos_x,scope,pos_z]) ){
                        cell_if_action[this.actions[i]] = "d";
                    }
              }
            else{
               scope = pos_z+direction[2];
                if(scope >z-1 || scope<0 || this.will_position_in_tail([pos_x,pos_y,scope]) ){
                    cell_if_action[this.actions[i]] = "d";
                }
            }
        }
        return "{0}{1}{2}{3}{4}{5}{6}{7}".format(
            Math.sign(apple.object.position.x - pos_x),
            Math.sign(apple.object.position.y - pos_y),
            Math.sign(apple.object.position.z - pos_z),
            cell_if_action["a"],
            cell_if_action["w"],
            cell_if_action["s"],
            cell_if_action["d"],
            cell_if_action["none"]
        );
    }

    will_position_in_tail(position){
        for(let i=snake.body.length-2;i>=3;i--){
            if(Math.round(snake.body[i].position.x) === position[0] &&
               Math.round(snake.body[i].position.y) === position[1] &&
               Math.round(snake.body[i].position.z) === position[2] ){
                return true;
            }
        }
    }
    position_in_tail(position){
        for(let i=snake.body.length-1;i>=4;i--){
            if(Math.round(snake.body[i].position.x) === position[0] &&
               Math.round(snake.body[i].position.y) === position[1] &&
               Math.round(snake.body[i].position.z) === position[2] ){
                return true;
            }
        }
    }
    check_current_cell(dangerPos,position){
        if(this.position_in_tail(position) ||
            (position[0]>x-1 || position[0]<0) ||
            (position[1]>y-1 || position[1]<0) ||
            (position[2]>z-1 || position[2]<0)){
            return 'd';
        }
        for(let i=0; i<dangerPos.length-1;i++){
            if(dangerPos[i][0] === position[0] &&
                dangerPos[i][1] === position[1] &&
                dangerPos[i][2] === position[2]){
                return 'd';
            }
        }
        return 'b';
    }

    do(action){
      snake.changeDirection(action);
    }

}



