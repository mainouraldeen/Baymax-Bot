var mylang = require('../lang');
var fs = require('fs');
module.exports = function (controller) {

  function saveinfile(text) {
    fs.appendFile("patientInfo.txt", text + "\n", function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("file saved");
    });
  };


  controller.hears(mylang.greetingKeywords, 'message_received', function (bot, message) {
    bot.startConversation(message, function (err, convo) {

      saveinfile("**********************************************");
      convo.ask('Hello, i am Baymax your personal healthcare companion..I heard a sound of distress!\nWhat seems to be the trouble? :(', function (res, convo) {
        saveinfile(res.text);//hay2ole i am sick msln
        convo.next();
      });

      convo.ask('On scale of 1-10 how would you rate your pain?', function (res, convo) {
        saveinfile(res.text);
        convo.next();
      });// a check 3la el scale w a repeat el question lw gawb 8alt w sa3tha msh ha save fl file

      convo.ask({
        text: 'What type of pain do you have?',
        quick_replies: [{ title: 'Physical', payload: 'Physical' }, { title: 'Emotional', payload: 'Emotional' }],
      }, function (res, convo) {
        saveinfile(res.text);
        convo.next();

        //convo.stop();
      });

      // create a path for when a user says emotional
      convo.addMessage({
        text: "i am sorry for you :')\n\nIt's alright to cry..Crying is a natrual response to pain!\n\nEmotional treatments includes:\n\n1-contact with friends and loved ones!\n\n2-You can go for a walk\n\n3-Buy Ice-cream and Chocolates.\n\nhttp://gph.is/1OXCjCJ",
      }, 'Emotional_thread');


      // create a path for when a user says phys
      convo.addMessage({
        text: "What symtomes do you have?",
      }, 'Physical_thread');

      //////////////
      convo.addQuestion({
        text: 'What type of pain do you have?',
        quick_replies:
          [{ title: 'Physical', payload: 'Physical' },
          { title: 'Emotional', payload: 'Emotional' }]
      }
        , (res, convo) => {
          saveinfile(res.text);
          if (res.text == "Physical") { convo.gotoThread('Physical_thread'); }
          else { convo.gotoThread('Emotional_thread'); }

          convo.next();

        });

    });
  });
  /////////////////////////////
  let cold = {
    symtoms: ["runny nose", "cough"],
    diagnoses: ["you have Cold!"]

  };

  let low_sugar = {
    symtoms: ["sweating", "hunger", "headache"],
    diagnoses: ["you have low sugar!"]

  };

  let high_sugar = {
    symtoms: ["dry mouth", "thirst"],
    diagnoses: ["you have high sugar!"]

  };


  controller.hears(cold.symtoms, "message_received", function (bot, message) {

    bot.reply(message, cold.diagnoses);
  });
  
  // controller.hears(["runny nose", "cough"], 'message_received', function (bot, message) {
  //   bot.reply(message, "you have cold :/");
  // });
  // controller.hears(mylang.cold, 'message_received', function (bot, message) {
  //   bot.reply(message, "cold");
  // });


  controller.hears(high_sugar.symtoms, "message_received", function (bot, message) {

    bot.reply(message, high_sugar.diagnoses);
  });

  controller.hears(low_sugar.symtoms, "message_received", function (bot, message) {

    bot.reply(message, low_sugar.diagnoses);
  });
  ////////////////////////

  controller.hears(mylang.endConversetion, 'message_received', function (bot, message) {
    bot.reply(message, "I hope you get well soon :)\n\nyou've been a good boy have a lollipop. 🍭");
  });
  

}

 // controller.hears(["Emotional","Physical"], 'message_received', function (bot, message) {
  //   bot.createConversation(message, function (err, convo) {

  //     // create a path for when a user says phys
  //     convo.addMessage({
  //       text: 'You said Physical',
  //     }, 'Physical_thread');

  //     // create a path for when a user says emotional
  //     convo.addMessage({
  //       text: "i am sorry for you :')\n\nIt's alright to cry..Crying is a natrual response to pain!\n\nEmotional treatments includes:\n\n1-contact with friends and loved ones!\n\n2-You can go for a walk\n\n3-Buy Ice-cream and Chocolates.\n\nhttp://gph.is/1OXCjCJ",
  //     }, 'Emotional_thread');

  //     convo.addQuestion({
  //       text: 'What type of pain do you have?',
  //       quick_replies:
  //         [{ title: 'Physical', payload: 'Physical' },
  //         { title: 'Emotional', payload: 'Emotional' }]
  //     }
  //       , (res, convo) => {
  //         saveinfile(res.text);
  //         if (res.text == "Physical") { convo.gotoThread('Physical_thread'); }
  //         else { convo.gotoThread('Emotional_thread'); }

  //         convo.next();

  //       });

  //   });
  // });