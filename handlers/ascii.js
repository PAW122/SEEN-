const ascii = require("ascii-table")
module.exports = (command,file,table,name,name_en,nr_tabeli) => {
    //✅ = tak / włączona
    //🟧 = nie zdefiniowano włączenia
    //❌ = nie / wyłączona
if(nr_tabeli == "1"){//komedy
        if(command.name){
            if(command.name_en){
                if(command.work){
                    if(command.work == "yes"){//komenda jest włączona
                        table.addRow(file, "✅", "❌", "❌",  "✅", "✅","✅")
                    }else{//komendajest wyłączona
                        table.addRow(file, "✅", "❌", "❌",  "✅", "✅","❌") 
                    }
                }else{//nie zdefiniowano włączenia
                    table.addRow(file, "✅", "❌", "❌",  "✅", "✅","🟧")
                }
            }else{
                if(command.work){
                    if(command.work == "yes"){
                        table.addRow(file, "✅", "❌", "❌",  "✅", "❌","✅")
                    }else{
                        table.addRow(file, "✅", "❌", "❌",  "✅", "❌","❌")  
                    }
                }else{
                    table.addRow(file, "✅", "❌", "❌",  "✅", "❌","🟧")
                }
            } 
        }else{//jeśli nie ma polskiego
            if(command.name_en){
                if(command.work){
                    if(command.work == "yes"){
                        table.addRow(file, "✅", "❌", "❌",  "❌", "✅","✅")
                    }else{
                        table.addRow(file, "✅", "❌", "❌",  "❌", "✅","❌")
                    }
                }else{
                    table.addRow(file, "✅", "❌", "❌",  "❌", "✅","🟧")
                }
            }else{
                if(command.work){
                    if(command.work == "yes"){
                    table.addRow(file, "✅", "❌", "❌",  "❌", "❌","✅")
                    }else{
                        table.addRow(file, "✅", "❌", "❌",  "❌", "❌","❌")  
                    }
                }else{
                    table.addRow(file, "✅", "❌", "❌",  "❌", "❌","🟧")
                }
            }  
        }//koniec ascii
    }




    if(nr_tabeli == "2"){//anime
        if(command.name){
            if(command.name_en){
                if(command.work){
                    if(command.work == "yes"){//komenda jest włączona
                        table.addRow(file, "❌", "✅", "❌",  "✅", "✅","✅")
                    }else{//komendajest wyłączona
                        table.addRow(file, "❌", "✅", "❌",  "✅", "✅","❌") 
                    }
                }else{//nie zdefiniowano włączenia
                    table.addRow(file, "❌", "✅", "❌",  "✅", "✅","🟧")
                }
            }else{
                if(command.work){
                    if(command.work == "yes"){
                        table.addRow(file, "❌", "✅", "❌",  "✅", "❌","✅")
                    }else{
                        table.addRow(file, "❌", "✅", "❌",  "✅", "❌","❌")  
                    }
                }else{
                    table.addRow(file, "❌", "✅", "❌",  "✅", "❌","🟧")
                }
            } 
        }else{//jeśli nie ma polskiego
            if(command.name_en){
                if(command.work){
                    if(command.work == "yes"){
                        table.addRow(file, "❌", "✅", "❌",  "❌", "✅","✅")
                    }else{
                        table.addRow(file, "❌", "✅", "❌",  "❌", "✅","❌")
                    }
                }else{
                    table.addRow(file, "❌", "✅", "❌",  "❌", "✅","🟧")
                }
            }else{
                if(command.work){
                    if(command.work == "yes"){
                    table.addRow(file, "❌", "✅", "❌",  "❌", "❌","✅")
                    }else{
                        table.addRow(file, "❌", "✅", "❌",  "❌", "❌","❌")  
                    }
                }else{
                    table.addRow(file, "❌", "✅", "❌",  "❌", "❌","🟧")
                }
            }  
        }//koniec ascii
    }

    if(nr_tabeli == "3"){//zapo
        if(command.name){
            if(command.name_en){
                if(command.work){
                    if(command.work == "yes"){//komenda jest włączona
                        table.addRow(file, "❌", "❌", "✅",  "✅", "✅","✅")
                    }else{//komendajest wyłączona
                        table.addRow(file, "❌", "❌", "✅",  "✅", "✅","❌") 
                    }
                }else{//nie zdefiniowano włączenia
                    table.addRow(file, "❌", "❌", "✅",  "✅", "✅","🟧")
                }
            }else{
                if(command.work){
                    if(command.work == "yes"){
                        table.addRow(file, "❌", "❌", "✅",  "✅", "❌","✅")
                    }else{
                        table.addRow(file, "❌", "❌", "✅",  "✅", "❌","❌")  
                    }
                }else{
                    table.addRow(file, "❌", "❌", "✅",  "✅", "❌","🟧")
                }
            } 
        }else{//jeśli nie ma polskiego
            if(command.name_en){
                if(command.work){
                    if(command.work == "yes"){
                        table.addRow(file, "❌", "❌", "✅",  "❌", "✅","✅")
                    }else{
                        table.addRow(file, "❌", "❌", "✅",  "❌", "✅","❌")
                    }
                }else{
                    table.addRow(file, "❌", "❌", "✅",  "❌", "✅","🟧")
                }
            }else{
                if(command.work){
                    if(command.work == "yes"){
                    table.addRow(file, "❌", "❌", "✅",  "❌", "❌","✅")
                    }else{
                        table.addRow(file, "❌", "❌", "✅",  "❌", "❌","❌")  
                    }
                }else{
                    table.addRow(file, "❌", "❌", "✅",  "❌", "❌","🟧")
                }
            }  
        }//koniec ascii
    }
}