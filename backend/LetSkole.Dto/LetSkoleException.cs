using System;
using System.Collections.Generic;
using System.Text;

namespace LetSkole.Dto
{
    public class LetSkoleException : Exception
    {
        public int Code { get; set; }

        // public LetSkoleException()
        // {
        // }

        public LetSkoleException(int code)
        {
            Code = code;
        }

        public LetSkoleException(string message)
            : base(message)
        {
        }

        // public LetSkoleException(string message, Exception inner)
        //     : base(message, inner)
        // {
        // }

        public LetSkoleException(string message, int code)
            : this(message)
        {
            Code = code;
        }
    }
}