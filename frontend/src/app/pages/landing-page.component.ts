import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Highlight {
  title: string;
  description: string;
}

interface Stat {
  value: string;
  label: string;
}

interface Service {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageAlt: string;
  bullets: string[];
}

interface Plan {
  name: string;
  price: string;
  cadence: string;
  badge?: string;
  summary: string;
  features: string[];
}

interface Faq {
  question: string;
  answer: string;
}

interface ContactCard {
  title: string;
  lines: string[];
  accent: string;
}

@Component({
  selector: 'app-landing-page',
  imports: [RouterLink],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent {
  protected readonly highlights: Highlight[] = [
    {
      title: 'व्यवसायासाठी आधुनिक सेवा',
      description: 'ई-सुविधा, अकौटिंग, आणि डिजिटल प्रोसेस एका ठिकाणी सुलभ पद्धतीने.'
    },
    {
      title: 'मराठी भाषेत स्पष्ट मार्गदर्शन',
      description: 'स्थानिक वापरकर्त्यांना सहज समजेल अशी भाषा, रचना, आणि सेवा अनुभव.'
    },
    {
      title: 'विश्वास, वेग, आणि सहकार्य',
      description: 'तुमच्या ग्राहकांसाठी जलद सेवा, तुमच्या टीमसाठी मजबूत सपोर्ट.'
    },
    {
      title: 'मोबाईल आणि वेब दोन्हीवर तयारी',
      description: 'दैनंदिन वापरासाठी हलका, प्रतिसादक्षम, आणि क्लासy डिजिटल फ्रंट.'
    }
  ];

  protected readonly stats: Stat[] = [
    { value: '232+', label: 'विश्वासू ग्राहक' },
    { value: '521+', label: 'पूर्ण झालेले प्रोजेक्ट' },
    { value: '24h', label: 'जलद प्रतिसाद लक्ष्य' },
    { value: '15+', label: 'समर्पित टीम सदस्य' }
  ];

  protected readonly services: Service[] = [
    {
      title: 'ई सुविधा',
      subtitle: 'मोबाईल अँप किंवा वेब अँप द्वारे उपलब्ध डिजिटल सेवा.',
      description:
        'ग्राहकांची कागदपत्रे अपलोड करून सेवा जलद पद्धतीने चालवण्यासाठी तयार केलेला सुलभ मॉडेल.',
      image: '/homepage/details-2.png',
      imageAlt: 'E Suvidha service illustration',
      bullets: [
        'तत्काळ रजिस्ट्रेशन आणि मराठी भाषेत स्पष्ट माहिती',
        '४०+ चालू सुविधा आणि नव्या API सेवांसाठी तयार प्लॅटफॉर्म',
        'डॉक्युमेंट, फोटो, आणि UPI पेमेंट्ससाठी सोपा फ्लो',
        '२४ तासांच्या आत काम पूर्ण करण्यावर लक्ष देणारी सपोर्ट टीम'
      ]
    },
    {
      title: 'सेल्फ अकौटिंग',
      subtitle: 'स्वतःच्या व्यवसायासाठी क्लाऊड आधारित अकौटिंग अनुभव.',
      description:
        'रोजच्या नोंदी, रिपोर्ट्स, GST/TDS प्रक्रिया, आणि CA सह समन्वय यासाठी आधुनिक डिजिटल साधन.',
      image: '/homepage/details-3.png',
      imageAlt: 'Self accounting service illustration',
      bullets: [
        'क्लाऊड अकौटिंगसह नेहमी उपलब्ध व्यवसाय डेटा',
        'PDF आणि Excel रिपोर्टिंग डाउनलोडची सोय',
        'ऑटो जनरेट GST, TDS आणि वेळोवेळी स्मार्ट अलर्ट',
        'समजण्यास सोपे, सुलभ, आणि टीमकडून संपूर्ण सहकार्य'
      ]
    },
    {
      title: 'आउटसोर्स अकौटिंग',
      subtitle: 'अकौटिंग टीमवर सोपवा आणि व्यवसायावर फोकस ठेवा.',
      description:
        'दररोज बिलांचे फोटो शेअर करा आणि उरलेले प्रोसेसिंग, सेव्हिंग, आणि रिपोर्टिंग आमच्या टीमकडून.',
      image: '/homepage/details-1.png',
      imageAlt: 'Outsource accounting service illustration',
      bullets: [
        'बिलांचे फोटो मोबाईलवरून अपलोड करण्याची सुविधा',
        'कायमस्वरूपी सेव्हिंग आणि मजबूत रिपोर्टिंग सपोर्ट',
        'अद्ययावत अकौटिंग अप्लिकेशन आणि व्यवस्थित दस्तऐवजीकरण',
        'वेळ वाचवणारा, विश्वासार्ह, आणि व्यवसाय-मैत्रीपूर्ण वर्कफ्लो'
      ]
    }
  ];

  protected readonly plans: Plan[] = [
    {
      name: 'फ्री ई सुविधा प्लॅन',
      price: '₹0',
      cadence: '/ month',
      summary: 'सुरुवातीसाठी योग्य, कमी अडथळ्याचा प्रवेश आणि मूलभूत डिजिटल सेवा.',
      features: [
        '४०+ चालू सुविधा',
        '२४ तासांच्या आत सेवा पूर्ण करण्यावर लक्ष',
        'संपूर्ण सहकार्य करणारी टीम',
        'नवीन वापरकर्त्यांसाठी ट्रायल-फ्रेंडली सुरुवात'
      ]
    },
    {
      name: 'सेल्फ अकौटिंग प्लॅन',
      price: '₹900',
      cadence: '/ month',
      badge: 'Popular',
      summary: 'स्वतःची अकौटिंग क्षमता मजबूत करायची असेल तर संतुलित आणि प्रभावी योजना.',
      features: [
        'क्लाऊड अकौटिंग आणि अद्ययावत सॉफ्टवेअर',
        'PDF / Excel रिपोर्टिंग',
        'GST, TDS आणि इतर ऑटो जनरेट प्रक्रिया',
        'रिपोर्टिंग आणि दैनंदिन कामासाठी चांगला कंट्रोल'
      ]
    },
    {
      name: 'टीमवर्क अकौटिंग प्लॅन',
      price: '₹5000',
      cadence: '/ month',
      summary: 'मोठ्या कामाच्या प्रमाणासाठी, सहयोगी टीम आणि सखोल अकौटिंग सपोर्टसह.',
      features: [
        'मोठ्या प्रमाणातील अकौटिंग प्रक्रिया हाताळण्यासाठी योग्य',
        'रिपोर्टिंग, सेव्हिंग आणि डॉक्युमेंट व्यवस्थापन',
        'बिलांचे फोटो आणि ऑपरेशनल वर्कफ्लो सपोर्ट',
        'स्केल होत असलेल्या व्यवसायासाठी दीर्घकालीन पर्याय'
      ]
    }
  ];

  protected readonly faqs: Faq[] = [
    {
      question: 'महा ई सुविधा काय काम करते?',
      answer:
        'महा ई सुविधा ही महाराष्ट्रातील व्यवसाय आणि उद्योगांसाठी B2B आणि B2C सॉफ्टवेअर सेवांची, ई-सुविधा, आणि अकौटिंग आउटसोर्सिंगची सेवा देणारी डिजिटल भागीदार टीम आहे.'
    },
    {
      question: 'ई सुविधा प्रकारात सेवा कशा दिल्या जातात?',
      answer:
        'व्यावसायिक किंवा सेवा केंद्र चालवणारे वापरकर्ते मोबाईल किंवा वेब अँपवरून ग्राहकांची कागदपत्रे अपलोड करतात. त्यानंतर प्रोसेसिंग, सपोर्ट, आणि डिलिव्हरी फ्लो टीमकडून पूर्ण केला जातो.'
    },
    {
      question: 'आउटसोर्स अकौटिंग प्रकारात नेमके काय होते?',
      answer:
        'तुम्ही बिलांचे फोटो किंवा आवश्यक माहिती अपलोड करता आणि अकौटिंग, रिपोर्टिंग, आणि नोंदींचे व्यवस्थापन आमची टीम हाताळते. त्यामुळे तुम्ही व्यवसायावर जास्त लक्ष केंद्रित करू शकता.'
    }
  ];

  protected readonly contacts: ContactCard[] = [
    {
      title: 'आमचा पत्ता',
      lines: ['नागवडे प्रॉपर्टी,', 'बारामती ते अहमदनगर रोड,', 'काष्टी, श्रीगोंदा अहमदनगर 414701'],
      accent: 'location'
    },
    {
      title: 'कॉल करा',
      lines: ['+91 9552789899'],
      accent: 'phone'
    },
    {
      title: 'ईमेल करा',
      lines: ['app.mahaesuvidha@gmail.com'],
      accent: 'mail'
    }
  ];
}
