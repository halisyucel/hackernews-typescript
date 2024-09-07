from transformers import T5Tokenizer, T5ForConditionalGeneration

# Model ve tokenizer'ı yerel klasörden yükle
tokenizer = T5Tokenizer.from_pretrained("./flan-t5-base")
model = T5ForConditionalGeneration.from_pretrained("./flan-t5-base")

# Test cümlesi
text = "Merhaba, "

# Tokenize et
input_ids = tokenizer(text, return_tensors="pt").input_ids

# Modeli kullanarak çıkış üret
outputs = model.generate(input_ids)

# Sonucu decode et ve yazdır
result = tokenizer.decode(outputs[0], skip_special_tokens=True)
print(result)
