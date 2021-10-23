using System;
using System.Collections.Generic;
using System.Text;

namespace LetSkole.Dto
{
    public class LetSkoleException : System.SystemException{
        public string value { get; set; }
        public LetSkoleException () {}

        public LetSkoleException (string message) 
        : base(message) { }
        
        public LetSkoleException (string message, Exception inner) 
        : base(message, inner) { }
        public LetSkoleException (string message, string value)
        : this(message) {
            this.value = value;
        }
    }
}
