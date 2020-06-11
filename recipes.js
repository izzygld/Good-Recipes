new Vue({    
    el: '#recipes',    
    ready:function(){
    this.fetchRecipes();
},
    data: {
        recipes : []
    },
        methods:{
        fetchRecipes:function(){
            this.$http.get('https://orthodox:union@es.content-index.oustatic.com:8443/rsstage_oukosher_org/_search', {q:"post_type:recipes",size:"1000"},
                function(data){
                this.$set('recipes', data.hits.hits)
            }).error(function(status){
                //handle error
                console.log(status);
            }); 
        }
    },

    computed:{
        options: function(){
            var unique = [];

            for (i = 0; i < this.recipes.length; i++) {
                var currentRecipe = this.recipes[i];
                var currentRecipeType = currentRecipe._source.post_meta.recipe_type[0];
                        var counter = 0;
                        for (var j = 0; j < unique.length; j++) {
                            if(unique[j]==currentRecipeType) continue;
                            else counter++;
                        }
                        
                        if(counter==unique.length) unique.push(currentRecipeType);
                     }

            return unique;
        }
    }
});