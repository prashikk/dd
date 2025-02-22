document.addEventListener("DOMContentLoaded", function() {
    console.log("JavaScript Loaded!"); // Debugging
  
    let selectedSkills = [];
    let selectedSkillsContainer = document.getElementById('selectedSkillsContainer');
    let selectedSkillsInput = document.getElementById('selectedSkills');
  
    document.getElementById("skillsList").addEventListener("click", function(event) {
        if (event.target.classList.contains("skill")) {
            console.log("Clicked on:", event.target.textContent); // Debugging
            let skill = event.target.textContent.trim();
            event.target.classList.toggle("selected");
  
            if (event.target.classList.contains("selected")) {
                selectedSkills.push(skill);
            } else {
                selectedSkills = selectedSkills.filter(s => s !== skill);
            }
  
            // ✅ Store selected skills in JSON format
            selectedSkillsInput.value = JSON.stringify(selectedSkills);
            updateSelectedSkillsUI();
        }
    });
  
    function updateSelectedSkillsUI() {
        selectedSkillsContainer.innerHTML = "";
        selectedSkills.forEach(skill => {
            let skillBadge = document.createElement("span");
            skillBadge.classList.add("badge", "bg-success", "m-1", "p-2");
            skillBadge.textContent = skill;
            selectedSkillsContainer.appendChild(skillBadge);
        });
    }
  });

  function fixCountryCode(input) {
    if (!input.value.startsWith("+91-")) {
      input.value = "+91-";
    }
  }
 
  