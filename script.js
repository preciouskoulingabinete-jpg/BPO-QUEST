let scores = { EmployeeOfTheMonth: 0, TiredRetiree: 0, ConfusedNewbie: 0, AnxiousNewbie: 0 };
const personaImages = {
  EmployeeOfTheMonth: "images/employee-of-the-month.png",
  TiredRetiree: "images/tired-retiree.png",
  ConfusedNewbie: "images/confused-newbie.png",
  AnxiousNewbie: "images/anxious-newbie.png"
};
const customerVisuals = {
  Maya: {
    defaultExpression: "neutral",
    images: {
      neutral: "images/HappyGreen.png",
      concerned: "images/ConfusedGreen.png",
      frustrated: "images/AngryGreen.png",
      relieved: "images/ReassuredGreen.png"
    }
  },
  Rina: {
    defaultExpression: "frustrated",
    images: {
      neutral: "images/HappyRed.png",
      concerned: "images/ConfusedRed.png",
      frustrated: "images/AngryRed.png",
      relieved: "images/ReassuredRed.png"
    }
  },
  Jordan: {
    defaultExpression: "concerned",
    images: {
      neutral: "images/48753d33-5573-4771-aa3d-1eca48069bb0-removebg-preview.png",
      concerned: "images/2d85ba43-6076-4b65-b5a9-a51ff2190af7-removebg-preview.png",
      frustrated: "images/72e502b1-0141-42ef-829d-8cb9cd6120f1-removebg-preview.png",
      relieved: "images/a23b52c8-4092-47fd-aa56-4c639dc305c2-removebg-preview.png"
    }
  }
};
let currentCustomerExpressions = {};

let scenes = [
  { type: "dialogue", 
    text: "BPO QUEST: Customer Service Simulator",  
    buttonText: "Enter",
    isTitle: true
  },

  { type: "dialogue", 
    text: "Curious about what kind of employee you are?", 
    fadeIn: true,
    buttonText: "Yes!"
   },

  { type: "dialogue", 
    text: "Great! The way you respond will lead to different outcomes. Exciting, isn't it?"
    },

  { type: "dialogue", 
    text: "Just answer with which you think resonates most with you. Have fun!"
  },

  { type: "question", customer: "Maya", text: "Maya calls because her delivery is a day late. She sounds calm and asks if you can check on it. What do you do first?", options: [
    { text: "Check the order, explain the latest tracking update, and offer a clear next step.", persona: "EmployeeOfTheMonth", expression: "relieved" },
    { text: "Look up the tracking status and give her a straightforward update.", persona: "TiredRetiree", expression: "neutral" },
    { text: "Ask a teammate where to find the delivery status, while letting Maya know you are checking.", persona: "ConfusedNewbie", expression: "neutral" },
    { text: "Confirm the order number and check with your lead before explaining the status.", persona: "AnxiousNewbie", expression: "concerned" }
  ]},
  { type: "question", customer: "Maya", text: "The tracking page says the package is still moving, but it gives no new delivery date. What do you tell Maya?", options: [
    { text: "Explain what the tracking does confirm, be honest about what is unknown, and offer a follow-up option.", persona: "EmployeeOfTheMonth", expression: "relieved" },
    { text: "Tell her the package is still in transit and avoid guessing at a new date.", persona: "TiredRetiree", expression: "neutral" },
    { text: "Ask a teammate what wording to use when tracking has no updated date.", persona: "ConfusedNewbie", expression: "neutral" },
    { text: "Check the delivery guidance with your lead so you do not promise the wrong date.", persona: "AnxiousNewbie", expression: "concerned" }
  ]},
  { type: "question", customer: "Maya", text: "Maya asks if you can change the delivery address, but the package may already be out for delivery. How do you respond?", options: [
    { text: "Check whether an address change is still allowed and explain the available alternatives.", persona: "EmployeeOfTheMonth", expression: "relieved" },
    { text: "Follow the address-change policy and tell her what can still be changed.", persona: "TiredRetiree", expression: "neutral" },
    { text: "Ask a teammate to show you where address-change eligibility is checked.", persona: "ConfusedNewbie", expression: "neutral" },
    { text: "Confirm the order and ask your lead to verify whether an address change is possible.", persona: "AnxiousNewbie", expression: "concerned" }
  ]},
  { type: "question", customer: "Maya", text: "Maya says the package arrived, but the box is damaged. What is your next step?", options: [
    { text: "Apologize, ask about the item's condition, and explain the return or replacement options.", persona: "EmployeeOfTheMonth", expression: "relieved" },
    { text: "Check the damage-claim process and walk her through the required steps.", persona: "TiredRetiree", expression: "neutral" },
    { text: "Ask a teammate which damage process applies before advising her.", persona: "ConfusedNewbie", expression: "neutral" },
    { text: "Review the policy and confirm with your lead before offering a replacement.", persona: "AnxiousNewbie", expression: "concerned" }
  ]},
  { type: "question", customer: "Maya", text: "Before ending the call, Maya asks what will happen next. How do you wrap up?", options: [
    { text: "Summarize the agreed next step, its expected timing, and how she can follow up.", persona: "EmployeeOfTheMonth", expression: "relieved" },
    { text: "Repeat the main action and give her the standard follow-up information.", persona: "TiredRetiree", expression: "neutral" },
    { text: "Check your notes with a teammate, then recap the next step to Maya.", persona: "ConfusedNewbie", expression: "concerned" },
    { text: "Read back your notes and confirm the next step with Maya before closing.", persona: "AnxiousNewbie", expression: "relieved" }
  ]},

  { type: "dialogue", text: "Next, Rina calls about being charged twice. She is furious and says she has already contacted support once.", image: "images/AngryRed.png", maxWidth: "175px" },
  { type: "question", customer: "Rina", text: "Rina starts the call angrily: 'You charged me twice and nobody is fixing it!' How do you respond?", options: [
    { text: "Let her explain, acknowledge the impact, and say you will review the charges with her.", persona: "EmployeeOfTheMonth", expression: "neutral" },
    { text: "Keep your voice steady, confirm the account, and begin checking the transactions.", persona: "TiredRetiree", expression: "frustrated" },
    { text: "Tell her you want to help, then quietly ask your teammate how to locate duplicate charges.", persona: "ConfusedNewbie", expression: "frustrated" },
    { text: "Apologize for the trouble and ask permission to place her on a brief hold to check with your lead.", persona: "AnxiousNewbie", expression: "concerned" }
  ]},
  { type: "question", customer: "Rina", text: "Rina says she has explained this already and does not want to repeat everything. What do you do?", options: [
    { text: "Summarize what you have understood and ask only for the detail needed to verify the charge.", persona: "EmployeeOfTheMonth", expression: "neutral" },
    { text: "Check the previous case notes and ask her to confirm only the key account detail.", persona: "TiredRetiree", expression: "concerned" },
    { text: "Ask your teammate to help you find the earlier case notes while you explain the brief wait.", persona: "ConfusedNewbie", expression: "frustrated" },
    { text: "Tell her you understand the repetition is frustrating and ask your lead to help locate the prior case.", persona: "AnxiousNewbie", expression: "concerned" }
  ]},
  { type: "question", customer: "Rina", text: "You find two transactions, but one may be a temporary authorization. What do you say?", options: [
    { text: "Explain the difference plainly, verify the transaction status, and give a realistic timeline for the next update.", persona: "EmployeeOfTheMonth", expression: "neutral" },
    { text: "Describe what the account shows and follow the billing process for confirming the charge.", persona: "TiredRetiree", expression: "concerned" },
    { text: "Ask your teammate to explain the authorization status so you can relay it accurately.", persona: "ConfusedNewbie", expression: "frustrated" },
    { text: "Avoid guessing; ask your lead to verify the transaction status before you explain it.", persona: "AnxiousNewbie", expression: "concerned" }
  ]},
  { type: "question", customer: "Rina", text: "Rina interrupts: 'So are you refunding me or not?' You still need to confirm whether the charge settled. How do you handle it?", options: [
    { text: "Answer directly about what you know, explain what must be confirmed, and promise only a specific next update.", persona: "EmployeeOfTheMonth", expression: "neutral" },
    { text: "State that you need to confirm settlement before a refund decision and continue the check.", persona: "TiredRetiree", expression: "frustrated" },
    { text: "Ask your teammate which status determines refund eligibility before you answer.", persona: "ConfusedNewbie", expression: "frustrated" },
    { text: "Tell her you do not want to mislead her and ask your lead to confirm the refund rule.", persona: "AnxiousNewbie", expression: "concerned" }
  ]},
  { type: "question", customer: "Rina", text: "The charge is confirmed as a duplicate and a refund request is submitted. How do you close the call?", options: [
    { text: "Apologize, give the refund reference and expected timing, and check if she has another concern.", persona: "EmployeeOfTheMonth", expression: "relieved" },
    { text: "Give the refund timeline and reference, then confirm she understands the next step.", persona: "TiredRetiree", expression: "neutral" },
    { text: "Ask a teammate to confirm the reference details, then repeat them clearly to Rina.", persona: "ConfusedNewbie", expression: "neutral" },
    { text: "Read back the refund details and ask your lead to verify the timeline before closing.", persona: "AnxiousNewbie", expression: "relieved" }
  ]},

  { type: "dialogue", text: "Your last customer is Jordan. They sound overwhelmed by a bill and say the instructions are confusing.", image: "images/48753d33-5573-4771-aa3d-1eca48069bb0-removebg-preview.png", maxWidth: "175px" },
  { type: "question", customer: "Jordan", text: "Jordan says, 'I don't understand this bill at all. I don't even know where to start.' What do you do?", options: [
    { text: "Reassure them, ask which part is most confusing, and explain one section at a time.", persona: "EmployeeOfTheMonth", expression: "neutral" },
    { text: "Ask which line they are looking at and give a short, plain-language explanation.", persona: "TiredRetiree", expression: "concerned" },
    { text: "Ask your teammate to point out the key bill sections, then guide Jordan through them.", persona: "ConfusedNewbie", expression: "concerned" },
    { text: "Slow down, check what Jordan already understands, and confirm each explanation before moving on.", persona: "AnxiousNewbie", expression: "concerned" }
  ]},
  { type: "question", customer: "Jordan", text: "Jordan points to a fee they do not recognize. How do you explain it?", options: [
    { text: "Check the account details and explain what the fee is for in everyday language.", persona: "EmployeeOfTheMonth", expression: "neutral" },
    { text: "Look up the fee description and give a concise explanation based on the account.", persona: "TiredRetiree", expression: "neutral" },
    { text: "Ask a teammate where to verify the fee, then explain what you learn.", persona: "ConfusedNewbie", expression: "concerned" },
    { text: "Verify the fee with your lead or reference guide before explaining it.", persona: "AnxiousNewbie", expression: "concerned" }
  ]},
  { type: "question", customer: "Jordan", text: "Jordan asks you to repeat the explanation because they are still unsure. What do you do?", options: [
    { text: "Try a simpler explanation and ask them to tell you which part still feels unclear.", persona: "EmployeeOfTheMonth", expression: "neutral" },
    { text: "Repeat the main point more slowly and check whether it answers their question.", persona: "TiredRetiree", expression: "neutral" },
    { text: "Ask your teammate for a simpler way to explain it, then try that wording.", persona: "ConfusedNewbie", expression: "concerned" },
    { text: "Break the explanation into smaller steps and pause after each one for confirmation.", persona: "AnxiousNewbie", expression: "relieved" }
  ]},
  { type: "question", customer: "Jordan", text: "Jordan asks whether the fee can be removed. The policy is not clear to you. What do you do?", options: [
    { text: "Check the policy and account eligibility, then explain any available options without promising an exception.", persona: "EmployeeOfTheMonth", expression: "concerned" },
    { text: "Use the standard fee-review process and explain what decision to expect.", persona: "TiredRetiree", expression: "neutral" },
    { text: "Ask a teammate where the fee-review policy is documented before answering.", persona: "ConfusedNewbie", expression: "concerned" },
    { text: "Tell Jordan you are checking the rule and confirm the answer with your lead.", persona: "AnxiousNewbie", expression: "concerned" }
  ]},
  { type: "question", customer: "Jordan", text: "Before ending the call, Jordan wants to make sure they know what to do next month. How do you help?", options: [
    { text: "Summarize the key dates and actions, then ask Jordan to confirm the plan makes sense.", persona: "EmployeeOfTheMonth", expression: "relieved" },
    { text: "Give a short recap of the next date and where to find the bill details.", persona: "TiredRetiree", expression: "neutral" },
    { text: "Write down the steps with your teammate's guidance and read them back clearly.", persona: "ConfusedNewbie", expression: "neutral" },
    { text: "Review the dates and steps slowly and ask Jordan if they want anything repeated.", persona: "AnxiousNewbie", expression: "relieved" }
  ]}
];

let currentScene = 0;
let selectedAnswers = {};
const introVoices = {
  1: document.getElementById("intro-voice"),
  2: document.getElementById("intro-voice-2"),
  3: document.getElementById("intro-voice-3")
};
const startedIntroVoices = new Set();
const questionVoices = new Map();
const dialogueVoices = new Map();
const questionVoiceCounts = { Maya: 0, Rina: 0, Jordan: 0 };
const resultVoice = new Audio("audio/results-wrap.mp3");
resultVoice.preload = "auto";
resultVoice.addEventListener("error", () => {
  console.error("Could not load the results voice clip.");
}, { once: true });

scenes.forEach((scene, sceneIndex) => {
  let clipNumber;
  let clipFile;

  if (sceneIndex === 0) {
    const voice = new Audio("audio/bpo-quest-title.mp3");
    voice.preload = "auto";
    voice.addEventListener("error", () => {
      console.error("Could not load the title voice clip.");
    }, { once: true });
    dialogueVoices.set(sceneIndex, voice);
  } else if (scene.type === "dialogue" && scene.text.startsWith("Next, Rina")) {
    clipNumber = 9;
  } else if (scene.type === "dialogue" && scene.text.startsWith("Your last customer is Jordan")) {
    clipNumber = 14;
  } else if (scene.customer === "Rina" && scene.text.includes("Rina starts the call angrily")) {
    clipFile = "audio/rina-first-question.mp3";
  } else if (scene.customer === "Jordan" && scene.text.includes("Jordan says, 'I don't understand this bill")) {
    clipFile = "audio/jordan-first-question.mp3";
  } else if (scene.type === "question") {
    const customerCount = questionVoiceCounts[scene.customer] || 0;
    if (scene.customer === "Maya") {
      clipNumber = 4 + customerCount;
    } else if (scene.customer === "Rina") {
      const rinaQuestionNumber = scenes
        .slice(0, sceneIndex)
        .filter(previousScene => previousScene.customer === "Rina").length;
      if (rinaQuestionNumber > 0) clipNumber = 9 + rinaQuestionNumber;
    } else if (scene.customer === "Jordan") {
      const jordanQuestionNumber = scenes
        .slice(0, sceneIndex)
        .filter(previousScene => previousScene.customer === "Jordan").length;
      if (jordanQuestionNumber > 0) clipNumber = 14 + jordanQuestionNumber;
    }
  }

  if (!clipNumber && !clipFile) return;

  const voice = new Audio(clipFile || `audio/teto-${clipNumber}.mp3`);
  voice.preload = "auto";
  voice.addEventListener("error", () => {
    console.error(`Could not load voice clip ${clipNumber}.`);
  }, { once: true });

  if (scene.type === "question") {
    questionVoices.set(sceneIndex, voice);
    questionVoiceCounts[scene.customer]++;
  } else {
    dialogueVoices.set(sceneIndex, voice);
  }
});

Object.values(introVoices).forEach(voice => {
  if (!voice) return;
  voice.addEventListener("error", () => {
    console.error("Could not load an introduction voice audio clip.");
  }, { once: true });
});

function findPreviousAnsweredQuestion(sceneIndex) {
  for (let index = sceneIndex - 1; index >= 0; index--) {
    if (scenes[index].type === "question" && selectedAnswers[index]) {
      return index;
    }
  }
  return -1;
}

function showPreviousQuestion(questionIndex) {
  const overlay = document.getElementById("overlay");
  if (overlay) overlay.style.opacity = 0;
  document.getElementById("text-box").classList.remove("results-active");
  document.getElementById("container").classList.remove("results-active");
  currentScene = questionIndex;
  showScene();
}

function appendPreviousQuestionButton(buttonsDiv, sceneIndex, label = "← Previous question") {
  const previousQuestionIndex = findPreviousAnsweredQuestion(sceneIndex);
  if (previousQuestionIndex < 0) return;

  const button = document.createElement("button");
  button.textContent = label;
  button.classList.add("previous-question-btn");
  button.onclick = () => showPreviousQuestion(previousQuestionIndex);
  buttonsDiv.appendChild(button);
}

function getCustomerExpressionBeforeScene(sceneIndex, customer) {
  for (let index = sceneIndex - 1; index >= 0; index--) {
    const previousScene = scenes[index];
    if (previousScene.type === "question" && previousScene.customer === customer && selectedAnswers[index]) {
      return selectedAnswers[index].expression;
    }
  }
  return customerVisuals[customer].defaultExpression;
}

function showScene() {
  let scene = scenes[currentScene];
  const sceneVoice = introVoices[currentScene] || dialogueVoices.get(currentScene) || questionVoices.get(currentScene);
  [...Object.values(introVoices), ...dialogueVoices.values(), ...questionVoices.values(), resultVoice].forEach(voice => {
    if (voice && voice !== sceneVoice) voice.pause();
  });

  const isIntroVoice = Boolean(introVoices[currentScene]);
  if (sceneVoice && (!isIntroVoice || !startedIntroVoices.has(currentScene))) {
    if (isIntroVoice) {
      startedIntroVoices.add(currentScene);
    } else {
      sceneVoice.currentTime = 0;
    }
    sceneVoice.play().catch(error => {
      console.error("Could not play the dialogue voice audio:", error);
    });
  }

  let textBox = document.getElementById("text-box");
  textBox.hidden = false;
  let buttonsDiv = document.getElementById("buttons");
  let container = document.getElementById("container");
  const firstQuestionIndex = scenes.findIndex(item => item.type === "question");
  container.classList.toggle("intro-active", currentScene < firstQuestionIndex);
  
  textBox.classList.remove("title-font", "question-font", "dialogue-scene");

  if (scene.isTitle) {
      textBox.classList.add("title-font");
  } else if (scene.type === "question") {
      textBox.classList.add("question-font");
  }

 if (scene.type === "dialogue" && !scene.isCreatorNote && !scene.isTitle) {
    textBox.classList.add("dialogue-scene");
}

  if (scene.type === "dialogue" && scene.isCreatorNote) {
      textBox.innerHTML = `<div class="creator-note">${scene.text}</div>`;
  } else {
      textBox.textContent = scene.text;
  }

  let imageDiv = document.getElementById("image");
  imageDiv.innerHTML = "";
    let imageSrc = scene.image;
    let imageAlt = scene.customer ? `${scene.customer}` : "Scene illustration";
    if (scene.type === "question" && scene.customer) {
      const visuals = customerVisuals[scene.customer];
      const expression = getCustomerExpressionBeforeScene(currentScene, scene.customer);
      imageSrc = visuals.images[expression];
      imageAlt = `${scene.customer} (${expression})`;
    }
    if (imageSrc) {
      let img = document.createElement("img"); 
      img.src = imageSrc;
      img.alt = imageAlt;
      img.style.maxWidth = scene.maxWidth || "300px"; 

      if (scene.fadeIn) {
          img.classList.add("fade-in");
          setTimeout(() => {
              img.classList.add("show");
          }, 10);
      }

      imageDiv.appendChild(img); 
  } 

  buttonsDiv.innerHTML = "";

  if (scene.type === "dialogue") {
      if (scene.buttons) {
          scene.buttons.forEach(label => {
              let btn = document.createElement("button");
              btn.textContent = label;
              btn.classList.add("dialogue-btn"); 
              btn.onclick = () => {
                  currentScene++;
                  showScene();
              };
              buttonsDiv.appendChild(btn);
          });
      } else {
          let btn = document.createElement("button");
          btn.textContent = scene.buttonText || "Next";
          btn.classList.add("dialogue-btn");
          btn.onclick = () => {
              currentScene++;
              showScene();
          };
          buttonsDiv.appendChild(btn);
      }
  } 
  else if (scene.type === "question") {
      const shuffledOptions = [...scene.options];
      for (let index = shuffledOptions.length - 1; index > 0; index--) {
        const swapIndex = Math.floor(Math.random() * (index + 1));
        [shuffledOptions[index], shuffledOptions[swapIndex]] = [shuffledOptions[swapIndex], shuffledOptions[index]];
      }
      shuffledOptions.forEach(option => {
          let btn = document.createElement("button");
          btn.textContent = option.text;
          btn.classList.add("question-btn"); 
          if (selectedAnswers[currentScene] === option) {
            btn.classList.add("is-selected-answer");
            btn.setAttribute("aria-label", `${option.text} (previously selected)`);
          }
          btn.onclick = () => {
              buttonsDiv.querySelectorAll("button").forEach(button => button.disabled = true);
              const previousAnswer = selectedAnswers[currentScene];
              if (previousAnswer) scores[previousAnswer.persona] -= 1;
              scores[option.persona] += 1;
              selectedAnswers[currentScene] = option;
              currentCustomerExpressions[scene.customer] = option.expression;
              const customerImage = document.querySelector("#image img");
              const imageSrc = customerVisuals[scene.customer].images[option.expression];
              if (customerImage && imageSrc) {
                customerImage.src = imageSrc;
                customerImage.alt = `${scene.customer} (${option.expression})`;
              }

              currentScene++;
              if (currentScene >= scenes.length) {
                showResult();
              } else {
                showScene();
              }
          };
          buttonsDiv.appendChild(btn);
      });
  }

  appendPreviousQuestionButton(buttonsDiv, currentScene);
}



function showResult() {
  const textBox = document.getElementById("text-box");
  const imageDiv = document.getElementById("image");
  const buttonsDiv = document.getElementById("buttons");
  const container = document.getElementById("container");

  [...Object.values(introVoices), ...dialogueVoices.values(), ...questionVoices.values()].forEach(voice => {
    if (voice) voice.pause();
  });
  resultVoice.currentTime = 0;
  resultVoice.play().catch(error => {
    console.error("Could not play the results voice audio:", error);
  });

  container.classList.remove("intro-active");
  container.classList.add("results-loading");
  textBox.classList.remove("title-font", "question-font", "dialogue-scene");
  textBox.textContent = "That's a wrap! We're reviewing your answers...";
  imageDiv.innerHTML = "";
  buttonsDiv.innerHTML = `
    <div class="result-loading" role="status">
      <span class="result-loading-spinner" aria-hidden="true"></span>
      <span>Finding your customer-service style</span>
    </div>
  `;

  window.setTimeout(() => {
    container.classList.remove("results-loading");
    renderResult();
  }, 4000);
}

function renderResult() {
  const textBox = document.getElementById("text-box");
  const container = document.getElementById("container");
  textBox.classList.add("results-active");
  container.classList.add("results-active");

  const buttonsDiv = document.getElementById("buttons");
  buttonsDiv.innerHTML = "";

  const overlay = document.getElementById("overlay");
  overlay.style.opacity = 1;

  const topPersona = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
  const profiles = {
    EmployeeOfTheMonth: "Proactive, empathetic, and focused on taking ownership while following policy.",
    TiredRetiree: "Steady and experienced, with a practical approach to resolving requests efficiently.",
    ConfusedNewbie: "Curious and eager to learn, with a preference for clear guidance and practice.",
    AnxiousNewbie: "Careful and conscientious, with a preference for reassurance and checking the process."
  };
  const personaNames = {
    EmployeeOfTheMonth: "Employee of the Month",
    TiredRetiree: "Tired Retiree",
    ConfusedNewbie: "Confused Newbie",
    AnxiousNewbie: "Anxious Newbie"
  };
  textBox.textContent = "";
  textBox.hidden = true;

  const personaResultLayout = document.createElement("section");
  personaResultLayout.classList.add("persona-result-layout");
  const personaImage = document.createElement("img");
  personaImage.classList.add("persona-result");
  personaImage.src = personaImages[topPersona];
  personaImage.alt = personaNames[topPersona];

  const personaResultCopy = document.createElement("div");
  personaResultCopy.classList.add("persona-result-copy");
  const resultHeading = document.createElement("h2");
  resultHeading.textContent = "Your customer-service type";
  const personaName = document.createElement("h3");
  personaName.textContent = personaNames[topPersona];
  const profileDescription = document.createElement("p");
  profileDescription.classList.add("result-description");
  profileDescription.textContent = profiles[topPersona];
  personaResultCopy.append(resultHeading, personaName, profileDescription);

  const totalAnswers = Object.values(scores).reduce((total, score) => total + score, 0);
  const scoreBreakdown = document.createElement("section");
  scoreBreakdown.classList.add("score-breakdown");
  scoreBreakdown.setAttribute("aria-labelledby", "score-breakdown-title");
  const scoreHeading = document.createElement("h2");
  scoreHeading.id = "score-breakdown-title";
  scoreHeading.textContent = "Your style breakdown";
  scoreBreakdown.appendChild(scoreHeading);

  Object.keys(scores).forEach(persona => {
    const row = document.createElement("div");
    row.classList.add("score-breakdown-row");

    const label = document.createElement("span");
    label.textContent = personaNames[persona];

    const progress = document.createElement("progress");
    progress.max = Math.max(totalAnswers, 1);
    progress.value = scores[persona];
    progress.setAttribute("aria-label", `${personaNames[persona]}: ${scores[persona]} of ${totalAnswers} choices`);

    const score = document.createElement("span");
    score.textContent = `${scores[persona]} / ${totalAnswers}`;

    row.append(label, progress, score);
    scoreBreakdown.appendChild(row);
  });
  personaResultCopy.appendChild(scoreBreakdown);
  personaResultLayout.append(personaImage, personaResultCopy);
  buttonsDiv.appendChild(personaResultLayout);

  const customerOutcomes = document.createElement("div");
  customerOutcomes.classList.add("customer-outcomes");
  const reactionsHeading = document.createElement("h2");
  reactionsHeading.classList.add("customer-outcomes-title");
  reactionsHeading.textContent = "Overall customer reactions";
  const reactionsIntro = document.createElement("p");
  reactionsIntro.classList.add("customer-outcomes-intro");
  reactionsIntro.textContent = "See how your responses affected each customer.";
  customerOutcomes.append(reactionsHeading, reactionsIntro);
  const reactionDescriptions = {
    relieved: "Your response helped them feel reassured.",
    neutral: "They received a calm, straightforward response.",
    concerned: "They may still need reassurance or a clearer explanation.",
    frustrated: "They may still feel frustrated; acknowledging their concern can help."
  };

  Object.keys(customerVisuals).forEach(customer => {
    const expression = currentCustomerExpressions[customer] || customerVisuals[customer].defaultExpression;
    const imageSrc = customerVisuals[customer].images[expression];
    const outcomeCard = document.createElement("article");
    outcomeCard.classList.add("customer-outcome-card");

    if (imageSrc) {
      const img = document.createElement("img");
      img.src = imageSrc;
      img.alt = customer;
      outcomeCard.appendChild(img);
    } else {
      outcomeCard.classList.add("is-text-only");
    }

    const outcomeDetails = document.createElement("div");
    outcomeDetails.classList.add("customer-outcome-details");
    const customerName = document.createElement("h3");
    customerName.textContent = customer;
    const reaction = document.createElement("p");
    reaction.classList.add("customer-outcome-status");
    reaction.textContent = `Overall reaction: ${expression}`;
    const reactionDescription = document.createElement("p");
    reactionDescription.textContent = reactionDescriptions[expression];
    outcomeDetails.append(customerName, reaction, reactionDescription);
    outcomeCard.appendChild(outcomeDetails);
    customerOutcomes.appendChild(outcomeCard);
  });
  buttonsDiv.appendChild(customerOutcomes);

  appendPreviousQuestionButton(buttonsDiv, currentScene, "← Review previous question");

  const resetGame = sceneIndex => {
    overlay.style.opacity = 0;
    textBox.classList.remove("results-active");
    container.classList.remove("results-active");
    scores = { EmployeeOfTheMonth: 0, TiredRetiree: 0, ConfusedNewbie: 0, AnxiousNewbie: 0 };
    currentCustomerExpressions = {};
    selectedAnswers = {};
    currentScene = sceneIndex;
    showScene();
  };

  const playAgainBtn = document.createElement("button");
  playAgainBtn.textContent = "Play Again";
  playAgainBtn.onclick = () => {
    const firstQuestionIndex = scenes.findIndex(scene => scene.type === "question");
    resetGame(firstQuestionIndex);
  };
  buttonsDiv.appendChild(playAgainBtn);

  const homeBtn = document.createElement("button");
  homeBtn.textContent = "Back to Home";
  homeBtn.onclick = () => resetGame(0);
  buttonsDiv.appendChild(homeBtn);

}



showScene();

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-img");
    const modalDesc = document.getElementById("modal-description");
    const closeModal = document.getElementById("close-modal");

    if (!modal || !modalImg || !modalDesc || !closeModal) return;

    document.querySelectorAll(".cat-thumb").forEach(thumb => {
        thumb.addEventListener("click", () => {
            modal.style.display = "flex";
            modalImg.src = thumb.dataset.stat;
            modalDesc.textContent = thumb.dataset.description;
        });
    });

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.style.display = "none";
    });
});

function setVh() {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
}

window.addEventListener('resize', setVh);
window.addEventListener('load', setVh);
setVh();
