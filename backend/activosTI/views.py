from django.shortcuts import render
from .forms import PersonaCreate
from .models import Persona, CatAlianza, CatArea, CatRegion, CatCargo, CatEstadoPersona
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import ListView, CreateView
from django.contrib import messages  # Import for messages
# Create your views here.


class PersonaCreate(CreateView):
    """"Vista Persona"""
    model = Persona
    model = CatAlianza
    form_class = PersonaCreate
    template_name = 'personaCreate.html'
    context_object_name = 'personas'


class PersonaLista(ListView):
    """Lista personas"""
    model = Persona
    template_name = 'persona.html'
    context_object_name = 'personas'

def persona(request):
    persona = Persona.objects.all()
    alianza = CatAlianza.objects.all()
    area = CatArea.objects.all()
    region = CatRegion.objects.all()
    cargo = CatCargo.objects.all()
    estado = CatEstadoPersona.objects.all()
    paginate_by = 10

    if request.method == 'GET':
        context = {
            'persona': persona,
            'alianza': alianza,
            'area': area,
            'region': region,
            'cargo': cargo,
            'estado': estado,
            'form': PersonaCreate
        }
        return render(request, 'personaCreate.html', context)

    else:
        form = PersonaCreate(request.POST)
        if form.is_valid():
            selected_area_name = form.cleaned_data['area']
            try:
                selected_area = CatArea.objects.get(nombre=selected_area_name)
                new_req = form.save(commit=False)
                new_req.area = selected_area
                new_req.save()
                return redirect('list')
            except CatArea.DoesNotExist:
                messages.error(request, 'No esta la opcion')
                context = {
                    'persona': persona,
                    'alianza': alianza,
                    'area': area,
                    'region': region,
                    'cargo': cargo,
                    'estado': estado,
                    'form': PersonaCreate
                }
                return render(request, 'personaCreate.html', context)